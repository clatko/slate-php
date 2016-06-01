# SLATE #

nginx site conf:

server {
    listen			80;
    server_name		docs.sample.org;
    root			/Library/WebServer/Documents/docs.sample.org;

	access_log		logs/docs.sample.org.access.log;
	error_log		logs/docs.sample.org.error.log;

	index			index.php;

   location / {
        try_files $uri $uri/ @rewrite;
    }

    location @rewrite {
        rewrite ^/([a-z0-9_]+.[a-z0-9_]*)(.*)$ /index.php?fuseaction=$1;
    }

    location ~ \.php$ {
        include /usr/local/nginx/conf/fastcgi_params;
        fastcgi_index  index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        # fastcgi_read_timeout 300;
        fastcgi_pass www-upstream-pool;
        # include /etc/nginx/fastcgi_params;
		fastcgi_param SCRIPT_NAME /$arg_fuseaction;

    }

}
