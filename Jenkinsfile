pipeline {
    agent any
    environment {
        // Image configurations
        FRONTEND_IMAGE = "ahmedmostafa22/propease-frontend"
        BACKEND_IMAGE = "ahmedmostafa22/propease-backend"
        DOCKER_HUB_REPO = "ahmedmostafa22"
        SERVER_IP = "13.60.236.156"
        
        // Resource limits for t3.micro
        SWAP_SIZE = "8G"
        BUILD_MEMORY = "700m"
    }

    stages {
        stage('Setup Server') {
            steps {
                sh """
                # Configure swap memory
                sudo fallocate -l ${SWAP_SIZE} /swapfile
                sudo chmod 600 /swapfile
                sudo mkswap /swapfile
                sudo swapon /swapfile
                
                # Verify Docker
                sudo systemctl start docker
                """
            }
        }

        stage('Clone Code') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/Ahmedaboalnader/PropEase.git',
                poll: false
            }
        }

        stage('Build Images') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        sh """
                        docker build \\
                            --memory=${BUILD_MEMORY} \\
                            -t ${FRONTEND_IMAGE}:latest \\
                            -f Frontend/Dockerfile Frontend/
                        """
                    }
                }
                stage('Build Backend') {
                    steps {
                        sh """
                        docker build \\
                            --memory=${BUILD_MEMORY} \\
                            -t ${BACKEND_IMAGE}:latest \\
                            -f RealEstateAPI/RealEstateAPI/dockerfile RealEstateAPI/RealEstateAPI/
                        """
                    }
                }
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerid',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                    docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
                    
                    # Tag and push frontend
                    docker tag ${FRONTEND_IMAGE}:latest ${DOCKER_HUB_REPO}/propease-frontend:latest
                    docker push ${DOCKER_HUB_REPO}/propease-frontend:latest
                    
                    # Tag and push backend
                    docker tag ${BACKEND_IMAGE}:latest ${DOCKER_HUB_REPO}/propease-backend:latest
                    docker push ${DOCKER_HUB_REPO}/propease-backend:latest
                    """
                }
            }
        }

        stage('Deploy Stack') {
            steps {
                sh """
                # Deploy using existing docker-stack.yml
                docker stack deploy -c docker-stack.yml --with-registry-auth app
                
                # Verify deployment
                echo "Current services:"
                docker service ls
                """
            }
        }

        stage('Verify Health') {
            steps {
                script {
                    def healthy = false
                    def maxRetries = 5
                    
                    for (int i = 1; i <= maxRetries; i++) {
                        try {
                            def status = sh(
                                script: "curl -s -o /dev/null -w '%{http_code}' http://${SERVER_IP}/health",
                                returnStdout: true
                            ).trim()
                            
                            if (status == "200") {
                                healthy = true
                                break
                            }
                        } catch (Exception e) {
                            echo "Attempt ${i}/${maxRetries} failed: ${e.message}"
                        }
                        sleep(time: 15, unit: 'SECONDS')
                    }
                    
                    if (!healthy) {
                        error("Health check failed after ${maxRetries} attempts")
                    }
                }
            }
        }
    }

    post {
        always {
            sh """
            docker logout || true
            docker system prune -f || true
            """
        }
        success {
            mail to: 'ahmed.mostafa.aboalnader@gmail.com',
                 subject: "✅ Deployment Successful - ${currentBuild.number}",
                 body: """
                 Application deployed successfully!
                 
                 Frontend: ${FRONTEND_IMAGE}:latest
                 Backend: ${BACKEND_IMAGE}:latest
                 
                 Access URL: http://${SERVER_IP}
                 """
        }
        failure {
            mail to: 'ahmed.mostafa.aboalnader@gmail.com',
                 subject: "❌ Deployment Failed - ${currentBuild.number}",
                 body: """
                 Deployment failed at stage: ${currentBuild.currentResult}
                 
                 Please check logs at: ${env.BUILD_URL}
                 """
        }
    }
}
