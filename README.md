## Development

* Whitelist your IP Address in MongoDB:
	* In the project, under security > network access
* Run `nodemon keystone`

## Deployment

### Lets Encrypt

* AWS CLI
* Docker Engine

```sh
aws configure

docker run -it --rm \
	-v "`pwd`/letsencrypt:/etc/letsencrypt" \
	-v "$HOME/.aws:/root/.aws" \
	certbot/dns-route53 \
	certonly \
		-n --agree-tos --email zain.albastaki@gmail.com \
		--dns-route53 \
		-d imshowcase.co.uk \
		-d *.imshowcase.co.uk

aws s3 cp letsencrypt/live/imshowcase.co.uk/fullchain.pem s3://elasticbeanstalk-eu-west-1-557770062002/certs/server.crt

aws s3 cp letsencrypt/live/imshowcase.co.uk/privkey.pem s3://elasticbeanstalk-eu-west-1-557770062002/certs/server.key

aws elasticbeanstalk rebuild-environment --environment-id e-rvkjrtg52e
```
