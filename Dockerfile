FROM ubuntu:xenial

EXPOSE 80
WORKDIR /var/www/html

RUN apt-get update --assume-yes && \
    apt-get install --assume-yes \
      imagemagick \
      curl \
      apache2 \
      mcrypt \
      nodejs \
      php7.0 \
      php7.0-mbstring \
      php7.0-mcrypt \
      php7.0-json \
      php7.0-curl \
      php7.0-fpm \
      php7.0-mysql \
      php-imagick \
      libapache2-mod-php7.0 \
      libapache2-mod-fastcgi \
      composer

COPY docker/files /

COPY . /var/www/html

RUN service apache2 stop && \
    a2enmod actions fastcgi headers rewrite alias proxy_fcgi && \
    rm /etc/apache2/sites-enabled/000-default.conf && \
    ln -s /etc/apache2/sites-available/atp.conf /etc/apache2/sites-enabled/atp.conf && \
    chmod -R 744 /var/www/html && \
    chown -R www-data /var/www/html

CMD ["apachectl", "-D", "FOREGROUND"]