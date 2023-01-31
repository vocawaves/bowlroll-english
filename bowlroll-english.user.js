// ==UserScript==
// @name         BowlRoll Translation
// @namespace    https://bowlroll.net
// @version      0.1.1
// @description  Experimental user script to translate BowlRoll into English
// @author       David (VOCA-UK TEAM)
// @license      CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
// @match        https://bowlroll.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bowlroll.net
// @grant        none
// @copyright 2022+, David Ralph (https://github.com/vocauk/bowlroll-english)
// ==/UserScript==

(function() {
   'use strict';
   const baseURL = 'https://bowlroll.net/';

   // ON ALL PAGES EXCEPT LOGIN AND 404 //
   try {
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
   } catch(e) {
     // fail silently
   }

   // SPECIFIC PAGES //
   // profile
   if (window.location.href.startsWith(baseURL + 'user/')) {
     // edit profile
     if (window.location.href.includes('profile')) {
        document.title = 'Edit Profile - BowlRoll';
        document.getElementById('page-nav-title').textContent = 'Edit Profile';
        document.querySelector('.btn > span').textContent = 'Back to user page';

        const nameForm = document.getElementById('user-profile-name');
        nameForm.querySelector('label').textContent = 'Name';
        nameForm.querySelector('span').textContent = 'Change';
        nameForm.querySelector('.form-input-hint').textContent = 'Required, up to 24 characters';

        const messageForm = document.getElementById('user-profile-message');
        messageForm.querySelector('label').textContent = 'Message';
        messageForm.querySelector('.form-input-hint').textContent = 'Up to 1024 characters';
        messageForm.querySelector('.btn-primary').textContent = 'Change';
        messageForm.querySelector('.btn-block').textContent = 'Reset';

        const profileViewForm = document.getElementById('user-profile-view');
        profileViewForm.querySelector('label').textContent = ('User Display: ' + (document.getElementById('user-profile-input-view').value === 'on' ? 'Public' : 'Hidden'));
        document.getElementById('user-profile-view-public-btn').textContent = 'Public';
        document.getElementById('user-profile-view-private-btn').textContent = 'Hidden';

        const siteForm = document.getElementById('user-profile-site');
        siteForm.querySelector('label').textContent = 'Site';
        siteForm.querySelector('.btn-primary').textContent = 'Change';
        siteForm.querySelector('.form-input-hint').textContent = 'URL notation only';

        const countryForm = document.getElementById('user-profile-country');
        countryForm.querySelector('label').textContent = 'Country';
        countryForm.querySelector('.btn-primary').textContent = 'Change';
        countryForm.querySelector('.form-input-hint').textContent = 'Up to 32 characters';

        const locationForm = document.getElementById('user-profile-location');
        locationForm.querySelector('label').textContent = 'Location';
        locationForm.querySelector('.btn-primary').textContent = 'Change';
        locationForm.querySelector('.form-input-hint').textContent = 'Up to 32 characters';
     }

     // this only appears on your own profile!
     try {
      document.querySelector('.outside > .h5').textContent = 'Display';
      document.querySelector('.outside > .btn > span').textContent = 'Edit Profile';
     } catch (e) {
      // this only appears on other's!
      document.querySelector('.tab-item > .badge').textContent = 'Latest Files';
      try {
       document.querySelector('a.common-btn').textContent = 'All Ages';
      } catch (e) {
       // doesn't show if signed out
      }
     }

     document.querySelector('.tab-item > a').textContent = 'Home';
     document.querySelector('.user-show-files > h3').textContent = 'Latest Files';
     const dateCreated = document.querySelector('#user-show-information-params > div:not(.bowlroll-id) > span');
     dateCreated.textContent = dateCreated.textContent.replace('年', '/').split('月')[0];
   }


   // file and file index
   // some of these pages use JS to get info, so it's not going to be possible to fully translate for a while
   if (window.location.href.startsWith(baseURL + 'file/')) {
     try {
       document.querySelector('.common-btn').textContent = 'All Ages';
     } catch (e) {
       // fail silently
     }
     if (window.location.href.includes('tag')) {
       document.title = 'Tag ' + document.title.replace('タグ検索: ', '');
       document.querySelector('.h4 > span').textContent = 'Tag Search';
     } else if (window.location.href.includes('keyword/')) {
       document.title = 'Search ' + document.title.replace('キーワード検索: ', '');
       document.querySelector('.h4 > span').textContent = 'Keyword Search';
       document.getElementById('file-keyword-tag-button').textContent = 'Similar Tags';
       document.getElementById('file-keyword-user-button').textContent = 'Contributing Users';
     } else if (!window.location.href.includes('upload') && !window.location.href.includes('index')) {
        const share = document.getElementById('file-show-share-button');
        share.querySelector('span').textContent = 'Share';
        // this line below won't set - will look into later
        document.querySelector('.modal-title').textContent = 'Share this page';
        const shareModalText = document.querySelectorAll('.modal-body > dl > dt');
        shareModalText[0].textContent = 'Share to other services';
        shareModalText[1].textContent = 'Copy URL';
        document.getElementById('file-show-copy-url-button').setAttribute('data-tooltip', 'Copied!');
        const otherMenu = document.getElementById('file-show-other-menu');
        otherMenu.querySelector('span').textContent = 'Report a problem (Japanese only)';
        document.querySelector('.side-files > h5 > span').textContent = 'Other Files';
        document.querySelector('.comments > h5 > span').textContent = 'Comments';
        document.querySelector('section > h3').textContent = 'All latest submissions';

        const fileInformation = document.querySelectorAll('.file-information > dl > dt');
        fileInformation[0].textContent = 'Submission Date';
        fileInformation[1].textContent = 'File Name';
        fileInformation[2].textContent = 'File Size';
        fileInformation[3].textContent = 'MD5 Checksum';
        fileInformation[4].textContent = 'SHA1 Checksum';

        // neither will these
        //const editTags = document.getElementById('file-show-tags-modal-button');
        //editTags.querySelector('span').textContent = 'Edit Tags';
        //document.querySelector('.side-files > h5 > a > span').textContent = 'View all';
     } else {
       document.title = 'File List - BowlRoll';
       document.querySelector('.column > .btn > span').textContent = 'Upload';
       document.querySelector('.h4 > span').textContent = 'Click here to upload';
       document.querySelector('.tab-item').textContent = 'Main Tags';
     }
   }

   let descriptionsDonate, donateBoxes, titles, fileUploadTexts, fileUploadColumns, aboutDescriptions, aboutSystemCards, updateModal, progressModal;
   switch (window.location.href) {
       // homepage
       case (baseURL):
         titles = document.querySelectorAll('section > h3');

         // hero
         descriptionsDonate = document.querySelectorAll('.cover > div');
         descriptionsDonate[0].textContent = 'Financial Support Request';
         descriptionsDonate[1].textContent = 'BowlRoll needs financial support to continue operating.';
         descriptionsDonate[2].textContent = 'If you\'d like to help out, please support us through the following services:';

         donateBoxes = document.querySelectorAll('.donation-service');
         donateBoxes[0].querySelector('p').textContent = 'If you would like to support us through FANBOX, please select your plan by clicking the button below.';
         donateBoxes[0].querySelectorAll('p')[2].textContent = 'You can also scan the QR code on your mobile device.';
         donateBoxes[1].querySelector('.h4').textContent = 'Creator Recommendation Program';
         donateBoxes[1].querySelector('p').textContent = 'To view our current supporters, click on the button below.';
         donateBoxes[1].querySelector('span').textContent = 'Content Tree';
         donateBoxes[1].querySelectorAll('p')[2].textContent = 'When submitting work to Nico Nico Douga, please register the below work as a parent.'

         titles[0].textContent = 'Notices';

         // recent works
         titles[1].textContent = 'Recent Submissions';

         // users
         titles[2].textContent = 'Contributing Users';

         // related links
         document.querySelector('.global-links > h3').textContent = 'Related Links';
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
          document.title = 'Help - BowlRoll';
          document.querySelector('.overview').innerHTML = `<h3>Help</h3>Currently, BowlRoll has no help section.
          <br/>This has been in place sine the release of BowlRoll.<br/>We plan to create help documentation in the next version. In the meantime,
          if you don't know how to use BowlRoll, just do your best!<br/>If you still don't understand, ask a question on BowlRoll's Twitter account
          or contact us (Japanese only).`;
          document.querySelectorAll('.tile-title')[1].textContent = 'Contact Us (Japanese only)';
          break;

       // my approved files
       case (baseURL + 'myself/approved-filelist'):
          document.title = 'Approved Files - BowlRoll';
          document.getElementById('page-nav-title').textContent = 'Approved Files';
          // todo: sort
          break;

       // my submissions
       case (baseURL + 'myself/filelist-public'):
          document.title = 'Submitted Files - BowlRoll';
          document.getElementById('page-nav-title').textContent = 'Submitted Files';
          document.getElementById('tab-item-public').textContent = 'Public';
          // Not too sure about these two translations
          document.getElementById('tab-item-user').textContent = 'Specified User';
          document.getElementById('tab-item-referer').textContent = 'Specified URL';

          document.getElementById('tab-item-private').textContent = 'Private';
          break;

       // file upload
       case (baseURL + 'file/upload'):
          document.title = 'Upload - BowlRoll';
          document.getElementById('page-nav-title').textContent = 'Upload';
          document.querySelector('.btn > span').textContent = 'Back to File List';
          fileUploadTexts = document.querySelectorAll('label > strong');
          fileUploadTexts[0].textContent = 'Select file';
          fileUploadTexts[1].textContent = 'Drop file here';
          document.querySelector('.explanation > h5').textContent = 'File Submission Requirements';
          fileUploadColumns = document.querySelectorAll('.explanation > .columns > .column');
          fileUploadColumns[0].innerHTML = `<dl><dt>File Name</dt><dd>32 characters or less</dd><dd>(including extension)</dd>`;
          fileUploadColumns[1].innerHTML = `<dl><dt>File Size</dt><dd>Less than 500MB</dd></dt>`;
          fileUploadColumns[2].innerHTML = `<dl><dt>File Format</dt><dd><span>.zip</span><span>.rar</span><span>.7z</span></dd></dl>`;
          updateModal = document.getElementById('form-file-update-modal-file');
          updateModal.querySelector('.modal-title').textContent = 'File Upload Confirmation';
          updateModal.querySelector('.modal-body > .columns > .column > h5').textContent = 'Main Tags';
          updateModal.querySelector('.col-mx-auto > .form-checkbox > span').textContent = 'I agree to BowlRoll\'s terms and conditions';
          document.getElementById('form-file-update-modal-rules-open').textContent = 'Open (Japanese only)';
          document.getElementById('form-file-update-modal-file-close').textContent = 'Close';
          updateModal.querySelector('.columns > .column > .btn-primary > span').textContent = 'Upload';
          progressModal = document.getElementById('progress-file');
          progressModal.querySelector('.text-center').textContent = 'Uploading...';
          break;

       case (baseURL + 'about/index'):
          document.title = 'About - BowlRoll';
          document.querySelector('.main-title > h1').textContent = 'About BowlRoll';
          document.querySelector('.description > h3').textContent = 'What is BowlRoll?';
          aboutDescriptions = document.querySelectorAll('.description > p');
          aboutDescriptions[0].textContent = 'BowlRoll is a site that provides a place to share information and distribute materials and programs for the publication and production of videos, images, music, games, and other works.';
          aboutDescriptions[1].textContent = 'We operate our service under the slogan "a site of producers, by producers, for producers".';
          aboutDescriptions[2].textContent = 'The services offered are as followed:';
          document.querySelector('.columns > .column > a > span').textContent = 'Files';
          document.querySelector('.columns > .column > div').textContent = 'File uploader for publishing works and distributing materials in production';
          document.querySelector('.system-info > h3').textContent = 'System Information';
          document.querySelector('.system-info > p').textContent = 'The current status of BowlRoll is as follows:';
          aboutSystemCards = document.querySelectorAll('.columns > .column > dl > dt');
          aboutSystemCards[0].textContent = 'Registered Users';
          aboutSystemCards[1].textContent = 'Users who submitted';
          aboutSystemCards[2].textContent = 'Public Files';
          aboutSystemCards[3].textContent = 'File Downloads';
          document.querySelector('.special-thanks > h3').textContent = 'Special Thanks';
          document.querySelector('.special-thanks > p').textContent = 'Users who supported BowlRoll with donations in its early days. (Other anonymous donors: 30 people)';
          break;

       case (baseURL + 'login'):
          document.title = 'Login - BowlRoll';
          document.querySelector('.inside > h1').textContent = 'Login';
          document.querySelector('.inside > p').textContent = 'Click on a social icon below';
          // seems to be JS
          document.querySelector('.title > span').textContent = 'Notices';
          break;

       default:
          break;
   }
})();
