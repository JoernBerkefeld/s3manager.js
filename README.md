# s3manager.js #
full multi-client AWS S3 file manager - without passing out s3 credentials to your clients

##Front-end##
It is based on **JavaScript**, jQuery and the aws-javascript-sdk and requires a server (back-end) component for authorization.

##Back-End##
The goal of this project is to be language agnostic. I'm starting out with modules for **PHP** and **Node.js** and hope to find more contributors for other languages over time.
You can then integrate those modules into your **own user management system** to set who can read and/or write into which "folder" and which S3-bucket.

Each modules therefore needs a client-facing application for authorization as well as we admin-facing user management system to set rights.
Obviously, upon integration this UMS will should to be adapted to your own needs but as a stand-alone version this will also work.

##To-Do##
###Admin-APIs: User Management System (language agnostic)###
* use json file to store credentials
* integrate password salting
* decide on hashing algo
* *table* users
  * user_id
  * session_id (only last used)
  * login-name
  * real name
  * email
  * 1:n > *table* login_history
  * password (encrypted)
  * password-salt
  * 1:1 > *table* customer
  * 1:n > *table* customer_user_groups
  * 1:n > *table* customer_admins (provide special pre-defined rights like "owner", "admin", "guest")
  * (optional) maxFileSize for upload
  * (optional) maxFileSizePerDay for upload (**important for demo case**)
* *table* login_history
  * session_id
  * created
  * last_seen
  * user_id
  * country_from
  * region_from
  * city_from
* *table* customers
  * global access restrictions 
  * 1:n > *table* users
  * 1:n > *table* customer_user_groups (defined by customer)
  * n:m > *table* buckets (with restriction on one folder incl. subfolders)
* *table* customer_user_groups
  * n:m > *table* users
  * n:m > *table* buckets (with restriction on one folder incl. subfolders)
  * (optional) maxFileSize for upload
  * (optional) maxFileSizePerDay for upload (**important for demo case**)
* *table* customer_admins
  * name
  * rights
  * n:m *table* users
* *table* buckets
  * n:m > *table* customers
* **build GUI**

###Client-APIs###
* give examples on how to store the Credentials (including recommendations on how not to)
* provide getFederationToken()
* make admin able to switch between passing out token to communicate with S3 directly OR (later) proxy everything through there webserver
* federationToken needs rights to / proxy-version needs:
  * DeleteObject
  * GetObject
  * ListBucket
  * PutObject
  * PostObject?

###Client GUI###

###Back-End###
####Node####
* wrap client-apis in modules
* test client-apis
* write admin-apis
* test admin-apis

####PHP####
* write client-apis
* test client-apis
* write admin-apis
* test admin-apis

###Grunt.js###
* write build scripts for each Backend language


###README.md###
* write install guide


###demo###
* setup on github.io


## LICENSE ##
MIT - free for all
