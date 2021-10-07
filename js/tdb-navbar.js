function tdb_nav()
{   
    var sMenu = '\
<div class="tdb-nav">\
    <span class="tdb-nav-span"><svg class="tdb-ico-nav tdb-ico-nav-f1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9.185l7 6.514v6.301h-3v-5h-8v5h-3v-6.301l7-6.514zm0-2.732l-9 8.375v9.172h7v-5h4v5h7v-9.172l-9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z"/></svg>\
    <a class="tdb-k tdb-k-h2" href="https://terminusdb.com/">Home</a></span>\
    <span class="tdb-nav-span"><svg class="tdb-ico-nav tdb-ico-nav-f1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.747 12.795l9.253 4.58-3.453 1.32 3.145 4.039-1.547 1.266-3.204-4.104-2.121 3.009-2.073-10.11zm-.747-2.795c0-1.104-.895-2-2-2s-2 .896-2 2 .895 2 2 2 2-.896 2-2zm-2-6c-3.314 0-6 2.686-6 6s2.686 6 6 6c.458 0 .902-.056 1.331-.153l-.403-1.966c-.299.071-.607.119-.928.119-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4c0 .384-.071.747-.173 1.099l1.824.902c.222-.626.349-1.298.349-2.001 0-3.314-2.686-6-6-6zm1.733 13.806c-.559.124-1.137.194-1.733.194-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8c0 1.021-.199 1.994-.549 2.892l1.803.892c.478-1.168.746-2.444.746-3.784 0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10c.733 0 1.446-.084 2.135-.234l-.402-1.96z"/></svg>\
    <a class="tdb-k tdb-k-h2" href="#">Docs Home</a></span>\
    <span class="tdb-nav-span"><svg class="tdb-ico-nav tdb-ico-nav-f1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-3.148 0-6 2.553-6 5.702 0 4.682 4.783 5.177 6 12.298 1.217-7.121 6-7.616 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 16l-6.707-2.427-5.293 2.427-5.581-2.427-6.419 2.427 4-9 3.96-1.584c.38.516.741 1.08 1.061 1.729l-3.523 1.41-1.725 3.88 2.672-1.01 1.506-2.687-.635 3.044 4.189 1.789.495-2.021.465 2.024 4.15-1.89-.618-3.033 1.572 2.896 2.732.989-1.739-3.978-3.581-1.415c.319-.65.681-1.215 1.062-1.731l4.021 1.588 3.936 9z"/></svg>\
    <a class="tdb-k tdb-k-h2" href="https://github.com/orgs/terminusdb/projects/2">Roadmap</a></span>\
    <span class="tdb-nav-span" style="color: silver" title="Coming soon..."><svg class="tdb-ico-nav tdb-ico-nav-f1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2 0v24h20v-24h-20zm18 22h-16v-15h16v15zm-3-4h-10v-1h10v1zm0-3h-10v-1h10v1zm0-3h-10v-1h10v1z"/></svg>\
    Glossary</span>\
    <span class="tdb-nav-span" style="color: silver" title="Coming soon..."><svg class="tdb-ico-nav tdb-ico-nav-f1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006zm1.024 13.975c0 .566-.458 1.025-1.024 1.025-.565 0-1.024-.459-1.024-1.025 0-.565.459-1.024 1.024-1.024.566 0 1.024.459 1.024 1.024zm1.141-8.192c-.498-.505-1.241-.783-2.09-.783-1.786 0-2.941 1.271-2.941 3.237h1.647c0-1.217.68-1.649 1.261-1.649.519 0 1.07.345 1.117 1.004.052.694-.319 1.046-.788 1.493-1.157 1.1-1.179 1.633-1.173 2.842h1.643c-.01-.544.025-.986.766-1.785.555-.598 1.245-1.342 1.259-2.477.008-.758-.233-1.409-.701-1.882z"/></svg>\
    FAQ</span>\
    <span class="tdb-nav-span"><svg class="tdb-ico-nav tdb-ico-nav-f1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>\
    <a class="tdb-k tdb-k-h2" href="https://terminusdb.com/contact/">Contact Us</span>\
</div>\
<br><br>\n\n';

    return sMenu;
}