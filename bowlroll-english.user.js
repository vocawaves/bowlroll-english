// ==UserScript==
// @name         BowlRoll Translation
// @namespace    https://bowlroll.net
// @version      0.1
// @description  Makes BowlRoll much easier to use for non-Japanese speakers
// @author       David (VOCA-UK TEAM)
// @match        https://bowlroll.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
   'use strict';
   const baseURL = 'https://bowlroll.net/';

   // ON ALL PAGES //
   // sidebar
   const sidebarItems = document.querySelectorAll('.menu-item > a > span');
   const otherSidebarItems = document.querySelectorAll('nav > .contents > a');
   sidebarItems[0].textContent = 'Files';
   sidebarItems[1].textContent = 'Help';
   sidebarItems[2].textContent = 'Contact Us (Japanese only)';
   otherSidebarItems[0].textContent = 'About BowlRoll';
   otherSidebarItems[1].textContent = 'Terms of Use (Japanese only)';
   otherSidebarItems[2].textContent = 'Privacy Policy (Japanese only)';

   // user sidebar
   sidebarItems[3].textContent = 'File Upload';
   sidebarItems[4].textContent = 'My Submissions';
   sidebarItems[5].textContent = 'Approved Submissions';
   sidebarItems[6].textContent = 'Settings';
   sidebarItems[7].textContent = 'Logout';

   // SPECIFIC PAGES //
   // profile
   if (window.location.href.startsWith(baseURL + 'user/')) {
     // edit profile
     if (window.location.href.includes('profile')) {
        document.title = 'Edit Profile - BowlRoll';
        document.getElementById('page-nav-title').innerText = 'Edit Profile';
        document.querySelector('.btn > span').innerText = 'Back to user page';

        const nameForm = document.getElementById('user-profile-name');
        nameForm.querySelector('label').innerText = 'Name';
        nameForm.querySelector('span').innerText = 'Change';
        nameForm.querySelector('.form-input-hint').innerText = 'Required, up to 24 characters';

        const messageForm = document.getElementById('user-profile-message');
        messageForm.querySelector('label').innerText = 'Message';
        messageForm.querySelector('.form-input-hint').innerText = 'Up to 1024 characters';
        messageForm.querySelector('.btn-primary').innerText = 'Change';
        messageForm.querySelector('.btn-block').innerText = 'Reset';

        const profileViewForm = document.getElementById('user-profile-view');
        profileViewForm.querySelector('label').innerText = ('User Display: ' + (document.getElementById('user-profile-input-view').value === 'on' ? 'Public' : 'Hidden'));
        document.getElementById('user-profile-view-public-btn').innerText = 'Public';
        document.getElementById('user-profile-view-private-btn').innerText = 'Hidden';

        const siteForm = document.getElementById('user-profile-site');
        siteForm.querySelector('label').innerText = 'Site';
        siteForm.querySelector('.btn-primary').innerText = 'Change';
        siteForm.querySelector('.form-input-hint').innerText = 'URL notation only';

        const countryForm = document.getElementById('user-profile-country');
        countryForm.querySelector('label').innerText = 'Country';
        countryForm.querySelector('.btn-primary').innerText = 'Change';
        countryForm.querySelector('.form-input-hint').innerText = 'Up to 32 characters';

        const locationForm = document.getElementById('user-profile-location');
        locationForm.querySelector('label').innerText = 'Location';
        locationForm.querySelector('.btn-primary').innerText = 'Change';
        locationForm.querySelector('.form-input-hint').innerText = 'Up to 32 characters';
     }

     // this only appears on your own profile!
     try {
      document.querySelector('.outside > .h5').innerText = 'Display';
      document.querySelector('.outside > .btn > span').innerText = 'Edit Profile';
     } catch (e) {
      // this only appears on other's!
      document.querySelector('.tab-item > .badge').innerText = 'Latest Files';
     }

     document.querySelector('.tab-item > a').innerText = 'Home';
     document.querySelector('.user-show-files > h3').innerText = 'Latest Files';
   }


   // file
   // some of this page uses JS to get info, so it's not going to be possible to fully translate for a while
   if (window.location.href.startsWith(baseURL + 'file/') && !window.location.href.includes('upload') && !window.location.href.includes('index')) {
     const share = document.getElementById('file-show-share-button');
     share.querySelector('span').innerText = 'Share';
     // this line below won't set - will look into later
     document.querySelector('.modal-title').innerText = 'Share this page';
     const shareModalText = document.querySelectorAll('.modal-body > dl > dt');
     shareModalText[0].innerText = 'Share to other services';
     shareModalText[1].innerText = 'Copy URL';
     document.getElementById('file-show-copy-url-button').setAttribute('data-tooltip', 'Copied!');
     const otherMenu = document.getElementById('file-show-other-menu');
     otherMenu.querySelector('span').innerText = 'Report a problem (Japanese only)';
     document.querySelector('.side-files > h5 > span').innerText = 'Other Files';
     document.querySelector('.comments > h5 > span').innerText = 'Comments';
     document.querySelector('section > h3').innerText = 'All latest submissions';

     const fileInformation = document.querySelectorAll('.file-information > dl > dt');
     fileInformation[0].innerText = 'Submission Date';
     fileInformation[1].innerText = 'File Name';
     fileInformation[2].innerText = 'File Size';
     fileInformation[3].innerText = 'MD5 Checksum';
     fileInformation[4].innerText = 'SHA1 Checksum';

     // neither will these
     const editTags = document.getElementById('file-show-tags-modal-button');
     editTags.querySelector('span').innerText = 'Edit Tags';
     document.querySelector('.side-files > h5 > a > span').innerText = 'View all';
   }

   let descriptionsDonate, donateBoxes, titles, fileUploadTexts, fileUploadColumns, aboutDescriptions, aboutSystemCards, updateModal, progressModal;
   switch (window.location.href) {
       // homepage
       case (baseURL):
         titles = document.querySelectorAll('section > h3');

         // hero
         descriptionsDonate = document.querySelectorAll('.cover > div');
         descriptionsDonate[0].innerText = 'Financial Support Request';
         descriptionsDonate[1].innerText = 'BowlRoll needs financial support to continue operating.';
         descriptionsDonate[2].innerText = 'If you\'d like to help out, please support us through the following services:';

         donateBoxes = document.querySelectorAll('.donation-service');
         donateBoxes[0].querySelector('p').innerText = 'If you would like to support us through FANBOX, please select your plan by clicking the button below.';
         donateBoxes[0].querySelectorAll('p')[2].innerText = 'You can also scan the QR code on your mobile device.';
         donateBoxes[1].querySelector('.h4').innerText = 'Creator Recommendation Program';
         donateBoxes[1].querySelector('p').innerText = 'To view our current supporters, click on the button below.';
         donateBoxes[1].querySelector('span').innerText = 'Content Tree';
         donateBoxes[1].querySelectorAll('p')[2].innerText = 'When submitting work to Nico Nico Douga, please register the below work as a parent.'

         titles[0].innerText = 'Notices';

         // recent works
         titles[1].innerText = 'Recent Submissions';

         // users
         titles[2].innerText = 'Contributing Users';

         // related links
         document.querySelector('.global-links > h3').innerText = 'Related Links';
         break;

       // settings
       case (baseURL + 'setting/common'):
          document.title = 'General Settings - BowlRoll';
          document.getElementById('page-nav-title').textContent = 'General Settings';
          document.querySelector('.form-label').textContent = 'Email';
          // I'm not sure what this means!
          document.querySelector('.form-input-hint').textContent = 'Email notation only';
          document.querySelector('.input-group-btn > span').textContent = 'Submit';
          document.querySelector('.label').textContent = 'Total file storage used';
          break;

       // help
       case (baseURL + 'help/index'):
          document.querySelector('.overview').innerHTML = `<h3>Help</h3>Currently, BowlRoll has no help section.
          <br/>This has been in place sine the release of BowlRoll.<br/>We plan to create help documentation in the next version. In the meantime,
          if you don't know how to use BowlRoll, just do your best!<br/>If you still don't understand, ask a question on BowlRoll's Twitter account
          or contact us (Japanese only).`;
          break;

       // files
       case (baseURL + 'file/index'):
       case (baseURL + 'r18/file/index'):
          document.title = 'File List - BowlRoll';
          document.querySelector('.column > .btn > span').innerText = 'Upload';
          document.querySelector('.h4 > span').innerText = 'Click here to upload';
          document.querySelector('.common-btn').innerText = 'All Ages';
          document.querySelector('.tab-item').innerText = 'Main Tags';

          // sort
          // The actual file listing system BowlRoll uses is written in JavaScript and loaded on the client-side, therefore
          // we need to wait for it to get the initial page content first so it can render. It's late, so I'm not going to
          // try injecting translations for now.
          break;

       // my approved files
       case (baseURL + 'myself/approved-filelist'):
          document.title = 'Approved Files - BowlRoll';
          document.getElementById('page-nav-title').innerText = 'Approved Files';
          // todo: sort
          break;

       // my submissions
       case (baseURL + 'myself/filelist-public'):
          document.title = 'Submitted Files - BowlRoll';
          document.getElementById('page-nav-title').innerText = 'Submitted Files';
          document.getElementById('tab-item-public').innerText = 'Public';
          // Not too sure about these two translations
          document.getElementById('tab-item-user').innerText = 'Specified User';
          document.getElementById('tab-item-referer').innerText = 'Specified URL';

          document.getElementById('tab-item-private').innerText = 'Private';
          break;

       // file upload
       case (baseURL + 'file/upload'):
          document.title = 'Upload - BowlRoll';
          document.getElementById('page-nav-title').innerText = 'Upload';
          document.querySelector('.btn > span').innerText = 'Back to File List';
          fileUploadTexts = document.querySelectorAll('label > strong');
          fileUploadTexts[0].innerText = 'Select file';
          fileUploadTexts[1].innerText = 'Drop file here';
          document.querySelector('.explanation > h5').innerText = 'File Submission Requirements';
          fileUploadColumns = document.querySelectorAll('.explanation > .columns > .column');
          fileUploadColumns[0].innerHTML = `<dl><dt>File Name</dt><dd>32 characters or less</dd><dd>(including extension)</dd>`;
          fileUploadColumns[1].innerHTML = `<dl><dt>File Size</dt><dd>Less than 500MB</dd></dt>`;
          fileUploadColumns[2].innerHTML = `<dl><dt>File Format</dt><dd><span>.zip</span><span>.rar</span><span>.7z</span></dd></dl>`;
          updateModal = document.getElementById('form-file-update-modal-file');
          updateModal.querySelector('.modal-title').innerText = 'File Upload Confirmation';
          updateModal.querySelector('.modal-body > .columns > .column > h5').innerText = 'Main Tags';
          updateModal.querySelector('.col-mx-auto > .form-checkbox > span').innerText = 'I agree to BowlRoll\'s terms and conditions';
          document.getElementById('form-file-update-modal-rules-open').innerText = 'Open (Japanese only)';
          document.getElementById('form-file-update-modal-file-close').innerText = 'Close';
          updateModal.querySelector('.columns > .column > .btn-primary > span').innerText = 'Upload';
          progressModal = document.getElementById('progress-file');
          progressModal.querySelector('.text-center').innerText = 'Uploading...';
          break;

       case (baseURL + 'about/index'):
          document.title = 'About - BowlRoll';
          document.querySelector('.main-title > h1').innerText = 'About BowlRoll';
          document.querySelector('.description > h3').innerText = 'What is BowlRoll?';
          aboutDescriptions = document.querySelectorAll('.description > p');
          aboutDescriptions[0].innerText = 'BowlRoll is a site that provides a place to share information and distribute materials and programs for the publication and production of videos, images, music, games, and other works.';
          aboutDescriptions[1].innerText = 'We operate our service under the slogan "a site of producers, by producers, for producers".';
          aboutDescriptions[2].innerText = 'The services offered are as followed:';
          document.querySelector('.columns > .column > a > span').innerText = 'Files';
          document.querySelector('.columns > .column > div').innerText = 'File uploader for publishing works and distributing materials in production';
          document.querySelector('.system-info > h3').innerText = 'System Information';
          document.querySelector('.system-info > p').innerText = 'The current status of BowlRoll is as follows:';
          aboutSystemCards = document.querySelectorAll('.columns > .column > dl > dt');
          aboutSystemCards[0].innerText = 'Registered Users';
          aboutSystemCards[1].innerText = 'Users who submitted';
          aboutSystemCards[2].innerText = 'Public Files';
          aboutSystemCards[3].innerText = 'File Downloads';
          document.querySelector('.special-thanks > h3').innerText = 'Special Thanks';
          document.querySelector('.special-thanks > p').innerText = 'Users who supported BowlRoll with donations in its early days. (Other anonymous donors: 30 people)';
          break;

       default:
          break;
   }
})();