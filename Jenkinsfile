pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '--user root' // Run as root to avoid permission issues
                }
            }
            steps {
                script {
                    sh 'echo "Setting npm cache directory..."'
                    sh 'mkdir -p /home/node/.npm && npm config set cache /home/node/.npm'

                    sh 'echo "Listing files before build..."'
                    sh 'ls -l'
                    
                    sh 'echo "Installing dependencies..."'
                    sh 'npm install --unsafe-perm --cache /home/node/.npm'

                    sh 'echo "Checking npm version..."'
                    sh 'npm --version'

                    sh 'echo "Running build..."'
                    sh 'npm start'
                    
                    sh 'echo "Listing files after build..."'
                    sh 'ls -l'
                }
            }
        }
    }
}
