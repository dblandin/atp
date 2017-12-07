<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
    '*' => array(
        // common config settings
    ),
    'local.atp.com' => array(
        'devMode' => true,
        'cache' => false,
        'siteUrl' => array(
            'en_us' => 'http://local.atp.com/',
        ),
        'omitScriptNameInUrls' => true,
        'environmentVariables' => array(
            'basePath' => 'http://local.atp.com/',
            'baseUrl'  => '',
        ),
    ),
    'www.appletreepartners.com' => array(
          'devMode' => false,
          'cache' => true,
          'siteUrl' => array(
              'en_us' => 'http://www.appletreepartners.com/',
          ),
          'omitScriptNameInUrls' => true,
          'environmentVariables' => array(
              'basePath' => 'http://www.appletreepartners.com/',
              'baseUrl'  => '',
          ),
      ),
    	'atp.rngr.org' => array(
            'devMode' => false,
            'cache' => false,
            'siteUrl' => array(
                'en_us' => 'http://atp.rngr.org/',
            ),
            'omitScriptNameInUrls' => true,
            'environmentVariables' => array(
                'basePath' => 'http://atp.rngr.org/',
                'baseUrl'  => '',
            ),
        )
);
