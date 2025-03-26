pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                script {
                    sh 'echo "Setting npm cache directory..."'
                    sh 'npm config set cache /tmp/.npm'

                    sh 'echo "Listing files before build..."'
                    sh 'ls -l'
                    
                    sh 'echo "Installing dependencies..."'
                    sh 'npm install --unsafe-perm'
                    
                    sh 'echo "Checking npm version..."'
                    sh 'npm --version'
                    
                    sh 'echo "Running build..."'
                    sh 'npm run build'
                    
                    sh 'echo "Listing files after build..."'
                    sh 'ls -l'
                }
            }
        }
    }
}
