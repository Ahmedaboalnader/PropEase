pipeline {
    agent any
    environment {
        FRONTEND_IMAGE = "ahmedmostafa22/propease-frontend"
        BACKEND_IMAGE = "ahmedmostafa22/propease-backend"
        DOCKER_HUB_REPO_FRONTEND = "ahmedmostafa22/propease-frontend"
        DOCKER_HUB_REPO_BACKEND = "ahmedmostafa22/propease-backend"
        SWAP_SIZE = "8G"  // يمكن تعديل الحجم حسب الحاجة
    }

    stages {
        stage('Setup Swap') {
            steps {
                script {
                    try {
                        sh """
                        # التحقق من صلاحيات sudo أولاً
                        if sudo -n true 2>/dev/null; then
                            echo "✅ لديه صلاحيات sudo"
                            SWAP_CMD_PREFIX="sudo"
                        else
                            echo "⚠️ لا يوجد صلاحيات sudo، سيحاول بدونها"
                            SWAP_CMD_PREFIX=""
                        fi

                        # إنشاء وتفعيل swapfile
                        if [ ! -f /swapfile ]; then
                            \$SWAP_CMD_PREFIX fallocate -l ${SWAP_SIZE} /swapfile || \
                            \$SWAP_CMD_PREFIX dd if=/dev/zero of=/swapfile bs=1M count=8192
                            \$SWAP_CMD_PREFIX chmod 600 /swapfile
                            \$SWAP_CMD_PREFIX mkswap /swapfile
                        fi
                        
                        # تفعيل swap إذا لم يكن مفعلاً
                        if ! swapon --show | grep -q /swapfile; then
                            \$SWAP_CMD_PREFIX swapon /swapfile || true
                        fi
                        
                        # إضافة لـ fstab إذا لم يكن موجوداً
                        if ! grep -q '/swapfile' /etc/fstab; then
                            echo "/swapfile none swap sw 0 0" | \$SWAP_CMD_PREFIX tee -a /etc/fstab
                        fi
                        
                        free -h
                        """
                    } catch (Exception e) {
                        echo "⚠️ تحذير: فشل إعداد SWAP: ${e.message}"
                        echo "المتابعة بدون SWAP مع احتمال تأثر الأداء"
                    }
                }
            }
        }

        stage('Clone Repository') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/Ahmedaboalnader/PropEase.git',
                poll: false,
                depth: 1
            }
        }

        stage('Detect Changes') {
            steps {
                script {
                    try {
                        def changes = sh(script: 'git diff --name-only HEAD~1 HEAD', returnStdout: true).trim()
                        env.FRONTEND_CHANGED = changes.contains("Frontend/") ? "true" : "false"
                        env.BACKEND_CHANGED = changes.contains("RealEstateAPI/") ? "true" : "false"
                        echo "Frontend changes: ${env.FRONTEND_CHANGED}, Backend changes: ${env.BACKEND_CHANGED}"
                    } catch (Exception e) {
                        echo "⚠️ فشل في اكتشاف التغييرات: ${e.message}"
                        env.FRONTEND_CHANGED = "true"
                        env.BACKEND_CHANGED = "true"
                    }
                }
            }
        }

        stage('Build Frontend') {
            when { environment name: 'FRONTEND_CHANGED', value: 'true' }
            steps {
                script {
                    try {
                        sh '''
                        echo "⚙️ Building Frontend..."
                        cd Frontend
                        echo "### محتويات مجلد Frontend ###"
                        ls -lah
                        echo "### محتوى Dockerfile ###"
                        cat Dockerfile || echo "⚠️ لا يوجد Dockerfile"
                        docker build -t $FRONTEND_IMAGE:latest -f Dockerfile . || exit 1
                        '''
                    } catch (Exception e) {
                        error("❌ فشل بناء Frontend: ${e.message}")
                    }
                }
            }
        }

        stage('Build Backend') {
            when { environment name: 'BACKEND_CHANGED', value: 'true' }
            steps {
                script {
                    try {
                        sh '''
                        echo "⚙️ Building Backend..."
                        cd RealEstateAPI/RealEstateAPI
                        echo "### محتويات مجلد Backend ###"
                        ls -lah
                        echo "### محتوى dockerfile ###"
                        cat dockerfile || echo "⚠️ لا يوجد dockerfile"
                        docker build -t $BACKEND_IMAGE:latest -f dockerfile . || exit 1
                        '''
                    } catch (Exception e) {
                        error("❌ فشل بناء Backend: ${e.message}")
                    }
                }
            }
        }

        stage('Push Frontend Image') {
            when { environment name: 'FRONTEND_CHANGED', value: 'true' }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerid', 
                    usernameVariable: 'DOCKER_USER', 
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    script {
                        try {
                            sh '''
                            echo "🔒 تسجيل الدخول إلى Docker Hub..."
                            docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
                            
                            echo "🏷️ Tagging Frontend Image..."
                            docker tag $FRONTEND_IMAGE:latest $DOCKER_HUB_REPO_FRONTEND:latest
                            
                            echo "🚀 Pushing Frontend Image..."
                            docker push $DOCKER_HUB_REPO_FRONTEND:latest
                            '''
                        } catch (Exception e) {
                            error("❌ فشل رفع صورة Frontend: ${e.message}")
                        }
                    }
                }
            }
        }

        stage('Push Backend Image') {
            when { environment name: 'BACKEND_CHANGED', value: 'true' }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerid', 
                    usernameVariable: 'DOCKER_USER', 
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    script {
                        try {
                            sh '''
                            echo "🔒 تسجيل الدخول إلى Docker Hub..."
                            docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
                            
                            echo "🏷️ Tagging Backend Image..."
                            docker tag $BACKEND_IMAGE:latest $DOCKER_HUB_REPO_BACKEND:latest
                            
                            echo "🚀 Pushing Backend Image..."
                            docker push $DOCKER_HUB_REPO_BACKEND:latest
                            '''
                        } catch (Exception e) {
                            error("❌ فشل رفع صورة Backend: ${e.message}")
                        }
                    }
                }
            }
        }

        stage('Deploy with Docker Stack') {
            steps {
                script {
                    try {
                        sh '''
                        echo "🚀 Deploying Docker Stack..."
                        docker stack deploy -c docker-stack.yml app --with-registry-auth
                        
                        echo "✅ Deployment Services:"
                        docker service ls --format "table {{.ID}}\t{{.Name}}\t{{.Mode}}\t{{.Replicas}}\t{{.Ports}}"
                        '''
                    } catch (Exception e) {
                        error("❌ فشل في نشر Docker Stack: ${e.message}")
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    def maxRetries = 5
                    def waitTime = 20
                    def success = false
                    
                    for (int i = 1; i <= maxRetries; i++) {
                        try {
                            def services = sh(script: 'docker service ls --filter "name=app_"', returnStdout: true).trim()
                            if (services.contains("1/1") || services.contains("1/1") {
                                success = true
                                echo "✅ جميع الخدمات تعمل بنجاح"
                                break
                            } else {
                                echo "⏳ جاري التحقق من الخدمات (المحاولة ${i}/${maxRetries})..."
                                echo "${services}"
                            }
                        } catch (Exception e) {
                            echo "⚠️ خطأ في التحقق من الخدمات: ${e.message}"
                        }
                        sleep(time: waitTime, unit: 'SECONDS')
                    }
                    
                    if (!success) {
                        error("❌ فشل التحقق من جميع الخدمات بعد ${maxRetries} محاولات")
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                try {
                    sh '''
                    echo "🧹 تنظيف النظام..."
                    docker logout || true
                    sudo swapoff /swapfile || true
                    '''
                } catch (Exception e) {
                    echo "⚠️ خطأ أثناء التنظيف: ${e.message}"
                }
            }
        }
        success {
            script {
                def frontendDigest = sh(
                    script: "docker inspect --format='{{index .RepoDigests 0}}' ${FRONTEND_IMAGE}:latest 2>/dev/null | cut -d'@' -f2 || echo 'unknown'",
                    returnStdout: true
                ).trim()
                
                def backendDigest = sh(
                    script: "docker inspect --format='{{index .RepoDigests 0}}' ${BACKEND_IMAGE}:latest 2>/dev/null | cut -d'@' -f2 || echo 'unknown'",
                    returnStdout: true
                ).trim()
                
                mail to: 'ahmed.mostafa.aboalnader@gmail.com',
                     subject: "✅ تم النشر بنجاح (Build ${env.BUILD_NUMBER})",
                     body: """
                     تم نشر التطبيق بنجاح! 🎉
                     
                     تفاصيل الإصدار:
                     - Frontend Digest: ${frontendDigest.take(12)}...
                     - Backend Digest: ${backendDigest.take(12)}...
                     
                     حالة الخدمات:
                     ${sh(script: "docker service ls --filter 'name=app_'", returnStdout: true)}
                     
                     رابط البناء: ${env.BUILD_URL}
                     """
            }
        }
        failure {
            mail to: 'ahmed.mostafa.aboalnader@gmail.com',
                 subject: "❌ فشل النشر (Build ${env.BUILD_NUMBER})",
                 body: """
                 فشل عملية النشر! 😞
                 
                 التفاصيل:
                 - حالة البناء: ${currentBuild.currentResult}
                 - مرحلة الفشل: ${env.STAGE_NAME}
                 
                 سجلات الخدمات:
                 ${sh(script: "docker service logs app_${sh(script: \"docker service ls --format '{{.Name}}' --filter name=app\", returnStdout: true).trim()}", returnStdout: true)}
                 
                 رابط البناء: ${env.BUILD_URL}
                 """
        }
    }
}
