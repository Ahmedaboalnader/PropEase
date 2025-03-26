pipeline {
    agent any
    environment {
        IMAGE_NAME = "propease-frontend"
        DOCKER_HUB_REPO = "ahmedmostafa22/propease-frontend"
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

        stage('Verify Files') {
            steps {
                sh '''
                echo "✅ التحقق من الملفات:"
                ls -la Frontend/
                echo "📦 التحقق من package.json:"
                cat Frontend/package.json
                '''
            }
        }

        stage('Build Image') {
            steps {
                sh '''
                cd Frontend
                docker build \
                    --memory=1.5g \
                    --cpuset-cpus=0 \
                    -t $IMAGE_NAME:latest .
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerid',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh '''
                    docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
                    docker tag $IMAGE_NAME:latest $DOCKER_HUB_REPO:latest
                    docker push $DOCKER_HUB_REPO:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                # أوقف الحاوية إذا كانت تعمل
                docker stop propease-frontend || true
                docker rm propease-frontend || true
                
                # احذف أي حاوية تستخدم المنفذ 80
                docker ps -q --filter "publish=80" | xargs -r docker stop | xargs -r docker rm
                
                # شغّل الحاوية الجديدة
                docker run -d \
                    --name propease-frontend \
                    -p 80:80 \
                    --restart unless-stopped \
                    $DOCKER_HUB_REPO:latest
                '''
            }
        }
    }
    post {
        always {
            sh 'sudo swapoff /swapfile || true'
        }
        success {
            mail to: 'ahmed.mostafa.aboalnader@gmail.com',
                 subject: "✅ تم النشر بنجاح",
                 body: "تم نشر التطبيق على: http://<SERVER_IP>"
        }
        failure {
            mail to: 'ahmed.mostafa.aboalnader@gmail.com',
                 subject: "❌ فشل النشر",
                 body: "راجع السجلات: ${env.BUILD_URL}"
        }
    }
}  // هذا القوس يغلق تعريف الـ pipeline
