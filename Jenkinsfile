pipeline {
    agent any
    agent {
        kubernetes {
            yaml '''
                apiVersion: v1
                kind: Pod
                spec:
                  containers:
                  - name: docker
                    image: docker:20-dind  # Docker-in-Docker image
                    securityContext:
                        privileged: true   # Granting privileged mode to run Docker commands
                    tty: true
                  - name: helm
                    image: alpine/helm:3.8.2
                    command:
                    - cat
                    tty: true
                  - name: azurecli
                    image: mcr.microsoft.com/azure-cli
                    command:
                    - cat
                    tty: true
            '''
        }
    }
    stages {
        // Clone Repository
        stage('Clone Repository') {
        stage('Clone Repo') {
            steps {
                script {
                    git url: 'https://github.com/Lokesh-Medaramitta/docker-frontend-backend-db.git'
                }
            }
        }
        // Create Network
        stage('Create Network') {
        stage('Creating Network') {
            steps {
                script {
                    sh 'docker network create loki || true'
                container('docker') {
                    script {
                        sh 'docker network create loki || true'
                    }
                }
            }
        }
        // Create Volume
        stage('Create Volume') {
        stage('Creating Volume') {
            steps {
                script {
                    sh 'docker volume create vol1 || true'
                container('docker') {
                    script {
                        sh 'docker volume create vol1 || true'
                    }
                }
            }
        }
        // MongoDB Pipeline (for Database setup)
        stage('MongoDB Pipeline') {
            when {
                branch 'master' // or specify which branches trigger MongoDB setup
            }
            stages {
                stage('Pull Mongo Image') {
                    steps {
                        script {
                            sh 'docker pull mongo'
                        }
        stage('Pulling Mongo') {
            steps {
                container('docker') {
                    script {
                        sh 'docker pull mongo'
                    }
                }
                stage('Run Mongo Container') {
                    steps {
                        script {
                            sh '''
                            docker run -d \
                            --network loki \
                            -v vol1:/data/db \
                            -e MONGODB_INITDB_ROOT_USERNAME=username \
                            -e MONGODB_INITDB_ROOT_PASSWORD=password \
                            mongo
                            '''
                        }
            }
        }
        stage('Running Mongo Container') {
            steps {
                container('docker') {
                    script {
                        sh '''
                        docker run -d \
                        --network loki \
                        -v vol1:/data/db \
                        -e MONGODB_INITDB_ROOT_USERNAME=username \
                        -e MONGODB_INITDB_ROOT_PASSWORD=password \
                        mongo
                        '''
                    }
                }
            }
            post {
                success {
                    echo 'MongoDB container deployed successfully!'
                }
                failure {
                    echo 'MongoDB deployment failed.'
                }
        }
        post {
            success {
                echo 'MongoDB container deployed successfully!'
            }
            failure {
                echo 'MongoDB deployment failed.'
            }
        }

        // Backend Pipeline
        stage('Backend Pipeline') {
            when {
                branch 'master' // or specify which branches trigger Backend setup
            }
            stages {
                stage('Build Backend Image') {
                    steps {
                        script {
                            sh 'docker build -t backend-image ./backend'
                        }
                    }
            steps {
                script {
                    git url: 'https://github.com/Lokesh-Medaramitta/docker-frontend-backend-db.git'
                }
                stage('Run Backend Container') {
                    steps {
                        script {
                            sh '''
                            docker run -d \
                            --network loki \
                            -p 3001:3001 \
                            backend-image
                            '''
                        }
            }
        }
        stage('Build Backend Image') {
            steps {
                container('docker') {
                    script {
                        sh 'docker build -t backend-image ./backend'
                    }
                }
            }
            post {
                success {
                    echo 'Backend container deployed successfully!'
                }
                failure {
                    echo 'Backend deployment failed.'
        }
        stage('Run Backend Container') {
            steps {
                container('docker') {
                    script {
                        sh '''
                        docker run -d \
                        --network loki \
                        -p 3001:3001 \
                        backend-image
                        '''
                    }
                }
            }
        }
        post {
            success {
                echo 'Backend container deployed successfully!'
            }
            failure {
                echo 'Backend deployment failed.'
            }
        }

        // Frontend Pipeline
        stage('Frontend Pipeline') {
            when {
                branch 'master' // or specify which branches trigger Frontend setup
            }
            stages {
                stage('Build Frontend Image') {
                    steps {
                        script {
                            sh 'docker build -t frontend-image ./frontend'
                        }
                    }
            steps {
                script {
                    git url: 'https://github.com/Lokesh-Medaramitta/docker-frontend-backend-db.git'
                }
                stage('Run Frontend Container') {
                    steps {
                        script {
                            sh '''
                            docker run -d \
                            --network loki \
                            -p 3000:3000 \
                            frontend-image
                            '''
                        }
            }
        }
        stage('Build Frontend Image') {
            steps {
                container('docker') {
                    script {
                        sh 'docker build -t frontend-image ./frontend'
                    }
                }
            }
            post {
                success {
                    echo 'Frontend container deployed successfully!'
                }
                failure {
                    echo 'Frontend deployment failed.'
        }
        stage('Run Frontend Container') {
            steps {
                container('docker') {
                    script {
                        sh '''
                        docker run -d \
                        --network loki \
                        -p 3000:3000 \
                        frontend-image
                        '''
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution completed.'
        post {
            success {
                echo 'Frontend container deployed successfully!'
            }
            failure {
                echo 'Frontend deployment failed.'
            }
        }
    }
}
