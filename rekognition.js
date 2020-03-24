class Rekognition {

    constructor(model){
        this.model = model
        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        });
        this.rekognition = new AWS.Rekognition();
        console.log(this.rekognition)
    }

    async detectCustomLabels(buffer){
        return new Promise((resolve, reject) => {
            var params = {
                Image: {
                    Bytes: buffer
                },
                ProjectVersionArn: this.model,
                MinConfidence: 0
            };
            this.rekognition.detectCustomLabels(params, (err, data)=> {
                if (err){
                    reject(err)
                }
                resolve(data);
            });
        })
    }
}