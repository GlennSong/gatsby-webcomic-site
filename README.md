# gatsby-webcomic-site

- [gatsby-webcomic-site](#gatsby-webcomic-site)
- [Some History](#some-history)
- [But, why though?](#but-why-though)
- [Overview](#overview)
- [Usage](#usage)
- [Modification](#modification)

# Some History
I was using Wordpress for my webcomic This Mortal Coil but it grew too cumbersome to use. I ended up breaking it and decided it was time for a change. A friend told me about static site generation and as I explored it I came across Gatsby. I'm not a React.js or Gatsby.js export. I'm not a javascript programmer by trade -- most of my work is in game development, but after a few Youtube videos on React and Gatsby and I was dangerous enough to try my hand at it. This site is the result of that work.

# But, why though? 
I wanted something to run faster online and allow me to have more control.

Wordpress woes aside, my website even with caching never seemed to run fast enough. 

Wordpress also meant I had to surrender control. Content is put in MySQL and images are uploaded to an Upload folder. I wanted my content organized together. The comic image and the markdown data in one folder. A comic as a group of folders. I believe Gatsby gave me that control.

# Overview

This is a simple no frills webcomic Gatsby static generated website and includes these features: 

* Author all content using Markdown text.
* Gatsby static site generation.
* Comics - handles long form comics with chapters and short form comics without.
  * Comics can contain either a single image or stack of images
* Comic Book Page that shows all of the comics (i.e. different issues or episodes)
* Blogging - write simple blog posts using Markdown
* Local filesystem - No database, all content is on the harddrive in the `content/` folder. Comic and blogging images and markdown files live together in a folder structure.
* Responsive first design - use of Bootstrap 4
* Top Navigation Bar 
* For comics use of a bottom navigation bar for first, prev, archive, next, last
* For blogging use of previous and next buttons
* Ability to show a featured comic
* RSS feed
* SEO
* Google Analytics
* Social Media sharing with Facebook and Twitter
* Embedding Instagram, Twitter posts
* XML sitemap
* Typography layout
* Use of Font Awesome React Icons

# Usage
Once you've downloaded this template project please check out how the long form and short form comics are setup. 

Keep in mind this is no frills. No WYSIWYG interface a la Wordpress. Everything is written using Markdown and stored locally on your harddrive in the `content` folder.

Once you've got the project downloaded go to `gatsby-config.js` and scroll down to `siteMetadata` and input your data. Most fields should be pretty self explanatory. 

To run use `gatsby develop` on the command line.

# Modification
Please feel free to use this as a base. I'm sure not everyone wants to use a local harddrive as their file system. I will admit dealing with markdown files directly can be very error prone.

If you would rather not deal with it and would prefer to find another headless CMS to suit your needs, then have at it.

As far as I'm concerned you can freely modify this code to fit your project's needs. Please credit me for the base, or don't, I don't know where'd you put it on your website anyway. 

I intend to periodically make bug fixes. If there are major issues please feel free to leave an Issue in the tracker and I'll resolve it. But, be warned, it'll probably take me some time to get around to fixing major bugs.

I do also intend to build new features for my webcomic and some of that might find their way in here as well. 

Good luck with your project.