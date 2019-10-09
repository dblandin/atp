# Apple Tree Partners

## Local Setup

**Option 1: Run everything locally**

This repository has a copy of CraftCMS in its `server/` folder. This is a little strange. Usually CraftCMS and any required plugins are installed via Composer locally or on staging/production servers, but here we are.

You can use some of these resources to setup CraftCMS and all of its requirements locally:

https://docs.craftcms.com/v2/installing.html#additional-resources

**Option 2: Use Docker & Docker Compose**

I preferred recently to use Docker and Docker Compose to spin up the server environment.

The Docker Compose setup uses three containers:

1. atp/app - Main application running CraftCMS, PHP, and Apache on Ubuntu
2. mariadb - MySQL server
3. redis - Redis server

To build, you can run `docker-compose build`.

To run everything, you can run `docker-compose up` (you can use the `-d|--detach` flag to run in the background)

**Restoring from a CraftCMS backup (using Docker approach)**

You can download a database backup from the CraftCMS admin section:

https://www.appletreepartners.com/admin/settings

Unzip the archive locally.

With the mariadb container running (check `docker-compose ps`), you can run a new container, volume-mounting the database backup file, and restore to the running MySQL server.

Enter the password `secret` (defined in the `docker-compose.yml` file) when prompted.

After running the mysql command, use Ctrl+D to exit the container.

```bash
$ docker-compose up --detach mariadb
$ docker-compose run --rm --volume ~/Downloads/path/to/backup.sql:/tmp/backup.sql mariadb /bin/bash
root@<container>:/# mysql --host mariadb --user craft --password --database atp < /tmp/backup.sql
```

## Local Development

Here are some common tasks you'll have to perform during development

**Watch folders, compile JavaScript, Stylus, SCSS, and setup LiveReload**

_Note from Devon 10/8/2019: I couldn't get Livereload to work /shrug_

```bash
$ npm run dev
```

**Build generated files & JavaScript**

In addition to what the `dev` command does, this should also generate minified assets and execute a full webpack build.

```bash
$ npm run build
```

## Deployment

Servers for staging and production environments run on Digital Ocean.

DNS is managed via GoDaddy.

Deployment is a bit rough at the moment. These are the common steps today:

- SSH into one of these servers
- `cd` to `/var/www/html`
- Run `git status`. There might be some changes in the `server/storage` directory from CraftCMS.
- Fetch code from GitHub
- Reset to origin/master or whatever else you like: `git reset --hard origin/master`

**Configuration**

If you've updated any files that require a full server restart, run:

```bash
$ service apache2 restart
```

The current database password is set into the environment via the `cat /etc/apache2/envvars` file. See the `DB_PASSWORD` entry towards the bottom of the file. If you need to set any other environment variables, do so in this file.