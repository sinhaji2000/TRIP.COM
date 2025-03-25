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
                    sh '''
                        echo "Listing files before build..."
                        ls -l
                        
                        echo "Installing dependencies..."
                        npm install
                        
                        echo "Checking npm version..."
                        npm --version
                        
                        echo "Running build..."
                        npm run build
                        
                        echo "Listing files after build..."
                        ls -l
                    '''
                }
            }
        }
    }
}
