pipeline {
    agent any
    stages {
        // Clone Repository
        stage('Clone Repository') {
            steps {
                script {
                    git url: 'https://github.com/Lokesh-Medaramitta/docker-frontend-backend-db.git'
                }
            }
        }

        // Create Network
        stage('Create Network') {
            steps {
                script {
                    sh 'docker network create loki || true'
                }
            }
        }

        // Create Volume
        stage('Create Volume') {
            steps {
                script {
                    sh 'docker volume create vol1 || true'
                }
            }
        }

        // MongoDB Pipeline (for Database setup)
        stage('MongoDB Pipeline') {
            when {
                branch 'main' // or specify which branches trigger MongoDB setup
            }
            stages {
                stage('Pull Mongo Image') {
                    steps {
                        script {
                            sh 'docker pull mongo'
                        }
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

        // Backend Pipeline
        stage('Backend Pipeline') {
            when {
                branch 'main' // or specify which branches trigger Backend setup
            }
            stages {
                stage('Build Backend Image') {
                    steps {
                        script {
                            sh 'docker build -t backend-image ./backend'
                        }
                    }
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

        // Frontend Pipeline
        stage('Frontend Pipeline') {
            when {
                branch 'main' // or specify which branches trigger Frontend setup
            }
            stages {
                stage('Build Frontend Image') {
                    steps {
                        script {
                            sh 'docker build -t frontend-image ./frontend'
                        }
                    }
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
    post {
        always {
            echo 'Pipeline execution completed.'
        }
    }
}
