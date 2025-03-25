pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    def nodeImage = docker.image('node:18-alpine')
                    nodeImage.pull()  // Ensure latest image is pulled
                    nodeImage.inside {
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
}
