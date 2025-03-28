pipeline {
    agent any
    environment {
        FRONTEND_IMAGE = "ahmedmostafa22/propease-frontend"
        BACKEND_IMAGE = "ahmedmostafa22/propease-backend"
        DATABASE_IMAGE = "ahmedmostafa22/sql-server"
        DOCKER_HUB_REPO_FRONTEND = "ahmedmostafa22/propease-frontend"
        DOCKER_HUB_REPO_BACKEND = "ahmedmostafa22/propease-backend"
        DOCKER_HUB_REPO_DATABASE = "ahmedmostafa22/sql-server"
        SERVER_IP = "51.20.6.97"
    }

    stages {
        stage('Setup Swap') {
            steps {
                sh '''
                if [ ! -f /swapfile ]; then
                    sudo fallocate -l 8G /swapfile
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
            when { environment name: 'FRONTEND_CHANGED', value: 'true' }
            steps {
                sh '''
                echo "Building Frontend..."
                cd Frontend || exit 1
                docker build -t $FRONTEND_IMAGE:latest -f Dockerfile . || exit 1
                '''
            }
        }

        stage('Build Backend') {
            when { environment name: 'BACKEND_CHANGED', value: 'true' }
            steps {
                sh '''
                echo "Building Backend..."
                cd RealEstateAPI/RealEstateAPI || exit 1
                docker build -t $BACKEND_IMAGE:latest -f dockerfile . || exit 1
                '''
            }
        }

        stage('Push Frontend Image') {
            when { environment name: 'FRONTEND_CHANGED', value: 'true' }
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
            when { environment name: 'BACKEND_CHANGED', value: 'true' }
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
                sh '''
                echo "Deploying stack..."
                docker stack deploy -c docker-stack.yml app
                '''
            }
        }

        stage('Health Check') {
    steps {
        script {
            def maxRetries = 5
            def waitTime = 10 

            for (int i = 0; i < maxRetries; i++) {
                def response = sh(script: "curl -s -o /dev/null -w \"%{http_code}\" http://51.20.6.97/health", returnStdout: true).trim()
                if (response == "200") {
                    echo "✅ Health Check Passed!"
                    return
                }
                echo "❌ Health Check failed! Retrying in ${waitTime} seconds..."
                sleep(waitTime)
            }
            error("🚨 Health Check failed after ${maxRetries} retries!")
        }
    }
}

    }

   post {
    always {
        sh 'sudo swapoff /swapfile || true &'
    }
   success {
    script {
        def version = sh(script: "docker inspect --format='{{.RepoDigests}}' ahmedmostafa22/propease-frontend:latest | grep -o 'sha256:[^]]*'", returnStdout: true).trim()
        mail to: 'ahmed.mostafa.aboalnader@gmail.com',
             subject: "✅ تم نشر التطبيق بنجاح",
             body: """
             🔹 **تم نشر التطبيق بنجاح! 🎉**
             🔗 رابط التطبيق: http://$SERVER_IP
             🏷️ رقم الإصدار: ${version}
             """
    }
}
    failure {
        mail to: 'ahmed.mostafa.aboalnader@gmail.com',
             subject: "❌ فشل النشر",
             body: """
             ❌ **فشل نشر التطبيق!**
             🔗 راجع السجلات: ${env.BUILD_URL}
             """
    }
}

}
