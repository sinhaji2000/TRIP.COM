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
                echo "Listing files before build..."
                sh 'ls -l'
                
                echo "Installing dependencies..."
                sh 'npm install'
                
                echo "Checking npm version..."
                sh 'npm --version'
                
                echo "Running build..."
                sh 'npm run build'
                
                echo "Listing files after build..."
                sh 'ls -l'
            }
        }
    }
}
