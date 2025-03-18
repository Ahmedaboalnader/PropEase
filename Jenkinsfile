pipeline {
    agent any

    environment {
        REGISTRY = "docker.io/ahmedmostafa22"
        IMAGE_NAME = "test"
        SERVER_IP = "your-server-ip"
        SSH_USER = "your-ssh-user"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Ahmedaboalnader/microservises.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $REGISTRY/$IMAGE_NAME:latest ."
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    withDockerRegistry([credentialsId: 'dockerid', url: '']) {
                        sh "docker push $REGISTRY/$IMAGE_NAME:latest"
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    sh """
                    ssh $SSH_USER@$SERVER_IP <<EOF
                    docker pull $REGISTRY/$IMAGE_NAME:latest
                    docker stop my-app || true
                    docker rm my-app || true
                    docker run -d --name my-app -p 80:80 $REGISTRY/$IMAGE_NAME:latest
                    EOF
                    """
                }
            }
        }
    }
}


 post {
        success {
            mail to: 'ahmed.mostafa.aboalnader@gmail.com',
                 subject: "The script has been bolled",
                 body: "The script has been bolled success"
        }
        failure {
            mail to: 'ahmed.mostafa.aboalnader@gmail.com',
                 subject: "failed ",
                 body: "The build failed."
        }
    }
}
