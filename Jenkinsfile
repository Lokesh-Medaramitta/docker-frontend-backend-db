pipeline {
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
        stage('Clone Repo') {
            steps {
                script {
                    git url: 'https://github.com/Lokesh-Medaramitta/docker-frontend-backend-db.git'
                }
            }
            post {
                success {
                    echo 'Repository cloned successfully!'
                }
                failure {
                    echo 'Repository cloning failed.'
                }
            }
        }
        stage('Creating Network') {
            steps {
                container('docker') {
                    script {
                        sh 'docker network create loki || true'
                    }
                }
            }
            post {
                success {
                    echo 'Network created successfully!'
                }
                failure {
                    echo 'Network creation failed.'
                }
            }
        }
        stage('Creating Volume') {
            steps {
                container('docker') {
                    script {
                        sh 'docker volume create vol1 || true'
                    }
                }
            }
            post {
                success {
                    echo 'Volume created successfully!'
                }
                failure {
                    echo 'Volume creation failed.'
                }
            }
        }
        stage('Pulling Mongo') {
            steps {
                container('docker') {
                    script {
                        sh 'docker pull mongo'
                    }
                }
            }
            post {
                success {
                    echo 'Mongo image pulled successfully!'
                }
                failure {
                    echo 'Failed to pull Mongo image.'
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
        }

        stage('Backend Pipeline') {
            steps {
                script {
                    git url: 'https://github.com/Lokesh-Medaramitta/docker-frontend-backend-db.git'
                }
            }
            post {
                success {
                    echo 'Backend repository cloned successfully!'
                }
                failure {
                    echo 'Backend repository cloning failed.'
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
                    echo 'Backend image built successfully!'
                }
                failure {
                    echo 'Backend image build failed.'
                }
            }
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
            post {
                success {
                    echo 'Backend container deployed successfully!'
                }
                failure {
                    echo 'Backend deployment failed.'
                }
            }
        }

        stage('Frontend Pipeline') {
            steps {
                script {
                    git url: 'https://github.com/Lokesh-Medaramitta/docker-frontend-backend-db.git'
                }
            }
            post {
                success {
                    echo 'Frontend repository cloned successfully!'
                }
                failure {
                    echo 'Frontend repository cloning failed.'
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
                    echo 'Frontend image built successfully!'
                }
                failure {
                    echo 'Frontend image build failed.'
                }
            }
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
}
