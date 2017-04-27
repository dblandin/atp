## Apple Tree Partners company website

### Setup

run all commands from the root of the project folder.
```
npm install
```

### watch folders and live reload.
```
npm run dev
```

### deploy.
```
npm run deploy
```

###Server

Use your own apache server (MAMP, WAMP, Osx Apache...).

There's 1 Vhost to setup:

```
<VirtualHost atp.local:80>

    DocumentRoot "/Users/mathias/Documents/Projects/apple-tree-partners/public"
    
    ServerName atp.local
    ServerAlias atp.local

    <Directory "/Users/mathias/Documents/Projects/zocdoc-sickday/public">
        Options FollowSymLinks
        AllowOverride All
        Order allow,deny
        allow from all
        SetEnv APPLICATION_ENV build

        DirectoryIndex index.php
    </Directory>
  
</VirtualHost>
```

And add this line to /etc/hosts

```
127.0.0.1 atp.local
```

Then, you can access :

```
atp.local
```
