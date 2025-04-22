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
                    sudo fallocate -l 6G /swapfile
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
        deleteDir()
        sh '''
        git clone https://github.com/Ahmedaboalnader/PropEase.git .
        git fetch --all
        git reset --hard origin/main
        '''
    }
}


        stage('Detect Changes') {
            steps {
                script {
                   def changes = sh(script: 'git diff --name-only origin/main', returnStdout: true).trim()

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
                ls -lah  
                docker build -t $FRONTEND_IMAGE:latest -f Dockerfile . || exit 1
                '''
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                echo "Building Backend..."
                cd RealEstateAPI/RealEstateAPI || exit 1
                ls -lah  
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
                
                sh' docker stack deploy -c docker-stack.yml app'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker service ls'
            }
        }
    }

    post {
        // always {
        //     sh 'sudo swapoff /swapfile || true'
        // }
        success {
            mail to: 'ahmed.mostafa.aboalnader@gmail.com',
                 subject: "✅ تم نشر التطبيق بنجاح",
                 body: "تم نشر التطبيق على: http://13.60.236.156/"
        }
        failure {
            mail to: 'ahmed.mostafa.aboalnader@gmail.com',
                 subject: "❌ فشل النشر",
                 body: "راجع السجلات: ${env.BUILD_URL}"
        }
    }
}







// pipeline {
//     agent any

//     environment {
//         FRONTEND_IMAGE = "ahmedmostafa22/propease-frontend"
//         BACKEND_IMAGE = "ahmedmostafa22/propease-backend"
//         DOCKER_HUB_REPO_FRONTEND = "ahmedmostafa22/propease-frontend"
//         DOCKER_HUB_REPO_BACKEND = "ahmedmostafa22/propease-backend"
//     }

//     stages {
//         stage('Setup Swap') {
//             steps {
//                 sh '''
//                 if [ ! -f /swapfile ]; then
//                     sudo fallocate -l 6G /swapfile
//                     sudo chmod 600 /swapfile
//                     sudo mkswap /swapfile
//                 fi
//                 sudo swapon /swapfile || true
//                 free -h
//                 '''
//             }
//         }

//         stage('Clone Repository') {
//             steps {
//                 deleteDir()
//                 sh '''
//                 git clone https://github.com/Ahmedaboalnader/PropEase.git .
//                 git fetch --all
//                 git reset --hard origin/main
//                 '''
//             }
//         }

//         stage('Detect Changes') {
//             steps {
//                 script {
//                     def changes = sh(script: 'git diff --name-only origin/main', returnStdout: true).trim()

//                     env.FRONTEND_CHANGED = changes.contains("Frontend/") ? "true" : "false"
//                     env.BACKEND_CHANGED = changes.contains("RealEstateAPI/") ? "true" : "false"
//                 }
//             }
//         }

//         stage('Build Frontend') {
//             when {
//                 expression { return env.FRONTEND_CHANGED == "true" }
//             }
//             steps {
//                 sh '''
//                 echo "Building Frontend..."
//                 cd Frontend || exit 1
//                 ls -lah  # Debugging: عرض الملفات في المسار
//                 docker build -t $FRONTEND_IMAGE:$BUILD_NUMBER -f Dockerfile . || exit 1
//                 '''
//             }
//         }

//         stage('Build Backend') {
//             when {
//                 expression { return env.BACKEND_CHANGED == "true" }
//             }
//             steps {
//                 sh '''
//                 echo "Building Backend..."
//                 cd RealEstateAPI/RealEstateAPI || exit 1
//                 ls -lah  # Debugging: عرض الملفات في المسار
//                 docker build -t $BACKEND_IMAGE:$BUILD_NUMBER -f dockerfile . || exit 1
//                 '''
//             }
//         }

//         stage('Push Frontend Image') {
//             when {
//                 expression { return env.FRONTEND_CHANGED == "true" }
//             }
//             steps {
//                 withCredentials([usernamePassword(credentialsId: 'dockerid', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
//                     sh '''
//                     docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
//                     docker tag $FRONTEND_IMAGE:$BUILD_NUMBER $DOCKER_HUB_REPO_FRONTEND:$BUILD_NUMBER
//                     docker push $DOCKER_HUB_REPO_FRONTEND:$BUILD_NUMBER
//                     '''
//                 }
//             }
//         }

//         stage('Push Backend Image') {
//             when {
//                 expression { return env.BACKEND_CHANGED == "true" }
//             }
//             steps {
//                 withCredentials([usernamePassword(credentialsId: 'dockerid', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
//                     sh '''
//                     docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
//                     docker tag $BACKEND_IMAGE:$BUILD_NUMBER $DOCKER_HUB_REPO_BACKEND:$BUILD_NUMBER
//                     docker push $DOCKER_HUB_REPO_BACKEND:$BUILD_NUMBER
//                     '''
//                 }
//             }
//         }

//         stage('Deploy with Docker Stack') {
//             steps {
//                 echo "Deploying with Docker Stack"
//                 sh '''
//                 docker stack deploy -c docker-stack.yml app
//                 '''
//             }
//         }

//         stage('Verify Deployment') {
//             steps {
//                 sh 'docker service ls'
//             }
//         }
//     }

//     post {
//         success {
//             mail to: 'ahmed.mostafa.aboalnader@gmail.com',
//                  subject: "✅ تم نشر التطبيق بنجاح",
//                  body: "تم نشر التطبيق على: http://13.60.236.156/"
//         }
//         failure {
//             mail to: 'ahmed.mostafa.aboalnader@gmail.com',
//                  subject: "❌ فشل النشر",
//                  body: "راجع السجلات: ${env.BUILD_URL}"
//         }
//     }
// }
