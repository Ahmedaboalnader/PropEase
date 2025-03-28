pipeline {
    agent any
    environment {
        FRONTEND_IMAGE = "ahmedmostafa22/propease-frontend"
        BACKEND_IMAGE = "ahmedmostafa22/propease-backend"
        DOCKER_HUB_REPO_FRONTEND = "ahmedmostafa22/propease-frontend"
        DOCKER_HUB_REPO_BACKEND = "ahmedmostafa22/propease-backend"
    }

    stages {
        stage('Setup Swap') {
            steps {
                sh '''
                if [ ! -f /swapfile ]; then
                    sudo fallocate -l 4G /swapfile
                    sudo chmod 600 /swapfile
                    sudo mkswap /swapfile
                fi
                sudo swapon /swapfile || true
                free -h
                '''
            }
        }

        stage('Clone Repository') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/Ahmedaboalnader/PropEase.git'
            }
        }

        stage('Detect Changes') {
            steps {
                script {
                    def changes = sh(script: 'git diff --name-only HEAD~1 HEAD', returnStdout: true).trim()
                    env.FRONTEND_CHANGED = changes.contains("Frontend/") ? "true" : "false"
                    env.BACKEND_CHANGED = changes.contains("RealEstateAPI/") ? "true" : "false"
                }
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                echo "Building Frontend..."
                cd Frontend || exit 1
                ls -lah  # Debugging: عرض الملفات في المسار
                docker build -t $FRONTEND_IMAGE:latest -f Dockerfile . || exit 1
                '''
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                echo "Building Backend..."
                cd RealEstateAPI/RealEstateAPI || exit 1
                ls -lah  # Debugging: عرض الملفات في المسار
                docker build -t $BACKEND_IMAGE:latest -f dockerfile . || exit 1
                '''
            }
        }

        stage('Push Frontend Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerid', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                    docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
                    docker tag $FRONTEND_IMAGE:latest $DOCKER_HUB_REPO_FRONTEND:latest
                    docker push $DOCKER_HUB_REPO_FRONTEND:latest
                    '''
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerid', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                    docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
                    docker tag $BACKEND_IMAGE:latest $DOCKER_HUB_REPO_BACKEND:latest
                    docker push $DOCKER_HUB_REPO_BACKEND:latest
                    '''
                }
            }
        }

        stage('Deploy with Docker Stack') {
            steps {
                // sh '''
                // echo "Deploying stack..."
                // if [ -f docker-stack.yml ]; then
                //     docker stack deploy -c docker-stack.yml propEaseStack
                // elif [ -f docker-stack.yaml ]; then
                //     docker stack deploy -c docker-stack.yaml propEaseStack
                // else
                //     echo "Error: No valid docker-stack file found!"
                //     exit 1
                // fi
                // '''
                sh' docker stack deploy -c docker-stack.yml'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker service ls'
            }
        }
    }

    post {
        always {
            sh 'sudo swapoff /swapfile || true'
        }
        success {
            mail to: 'ahmed.mostafa.aboalnader@gmail.com',
                 subject: "✅ تم نشر التطبيق بنجاح",
                 body: "تم نشر التطبيق على: http://<SERVER_IP>"
        }
        failure {
            mail to: 'ahmed.mostafa.aboalnader@gmail.com',
                 subject: "❌ فشل النشر",
                 body: "راجع السجلات: ${env.BUILD_URL}"
        }
    }
}
