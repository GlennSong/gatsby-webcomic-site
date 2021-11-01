# Table of Contents
- [Table of Contents](#table-of-contents)
- [Some History](#some-history)
- [But, why though?](#but-why-though)
- [Overview](#overview)
- [Usage](#usage)
- [Modification](#modification)
- [Tutorials](#tutorials)
  - [How to Organize Comic Books.](#how-to-organize-comic-books)
    - [Book Frontmatter Example](#book-frontmatter-example)
    - [Book Image](#book-image)
    - [Define the First Page](#define-the-first-page)
    - [Chapter List](#chapter-list)
  - [Comic Page Setup](#comic-page-setup)
    - [Frontmatter for a Comic Page](#frontmatter-for-a-comic-page)
    - [Comic Image vs. Comic Stack](#comic-image-vs-comic-stack)
    - [PostType](#posttype)
    - [Chapter](#chapter)
    - [Thumbnails](#thumbnails)
    - [Social Media Images and Usage](#social-media-images-and-usage)
    - [Blogging](#blogging)
- [Publishing Comics](#publishing-comics)
  - [Github](#github)
  - [Vercel](#vercel)
  - [Images](#images)
  - [Image file sizes](#image-file-sizes)
- [Authoring Tools](#authoring-tools)
  - [Visual Code](#visual-code)

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

There are some aspects of the code especially when it comes to how I use the Markdown frontmatter that are... shall we say, cumbersome. If you have any feedback about that please don't hesitate to share.

I do also intend to build new features for my webcomic and some of that might find their way in here as well. 

Oh, you'll probably want to modify the colors, style for the headers, typography and junk. I'll leave that to you. The gatsby project uses a typography setup to make it look nice and coherent, and you're free to remove it or change it. The colors are scattered all throughout. Maybe a future change would be to use SASS so those things can be centralized. Right now the CSS is scattered throughout the react components. 

Good luck with your project.

# Tutorials

This section will briefly touch on how this site organizes comic books and pages. When I created my comic I wanted to organize them as a collection of episodes or books and each book would have as many pages as necessary to tell the story. Below will be an explanation of how that works via using the Markdown frontmatter. 

## How to Organize Comic Books. 

Go to `content/comics/`. 

If you want to define a new book create a new folder similar to `long-form-comic` and `short-form-comic`. 

The folder name you create can't have spaces. It'll become the part of your URL permalink that defines the comic. For instance, the folder named `long-form-comic` will have the URL: `http://mywebcomicsite.com/comics/long-form-comic/`.

If you go to that link you'll go to a page dedicated to the comic book you created. In the case of `long-form-comic` it'll have several demo pages broken up into chapters. There's also a header that uses a 4k image. If you're curious why the images are so big, it's because I wanted to showcase the art in super high res since we live in the future. 

Inside of your folder you want to create a markdown file with the same name as the folder. Please look at `long-form-comic.md` as an example: 

### Book Frontmatter Example
There you will find this markdown frontmatter: 
```
---
title: Long Form Comic With Chapters Demo
slug: "long-form-comic"
posttype: comicbook
date: "2013-09-05T08:58:09.000Z"
featuredImage: "long-form-4k-cover.png"
tags: 
  - "featured"
  - "long-form"
featuredText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquet urna a orci commodo eleifend. Aliquam pretium feugiat arcu eget venenatis. Nunc placerat, nisi vitae varius venenatis, velit nibh sodales risus, ut dignissim nisi orci et metus. Etiam fermentum massa id ex fringilla, ac vehicula lectus ullamcorper."
firstPage: "long-form-1"
chapterList: 
  - "long-form-chapter-1"
  - "long-form-chapter-2"
  - "long-form-chapter-3"
  - "long-form-chapter-4"
  - "long-form-chapter-5"
---
```

Hopefully most of this will be fairly self explanatory as to what it does. 

All of this data is important so make sure you add it. Of that data though, GraphQL specifically will look at "posttype" and "tags" to help determine how to query for certain books and display them on the website. 

There are two important keywords to keep in mind for Long form comics: 
* `featured` - This tag denotes that you want to advertise this comic across your entire site using the FeaturedComic react component
* `long-form` - This tag says that the story is long form.
* `short-form` - This tag specifies the story as short form.

What's the difference between long and shortform? It's mostly a designation to allow the Comics section organize itself into different sections: 
 * A Featured Story - This is the work you're most proud of and want everyone to read.
 * Other Long Form Stories - These are other long stories
 * Short Stories - these are short stories, but I also use them as separate "books" to put unrelated artwork and fan art/comics. 

### Book Image
You'll also want an image for your book which you'll put in your book folder and attach it to the markdown data using the `featuredImage` frontmatter field.

### Define the First Page
The site needs to know where your story begins so define `firstPage` with the slug of your first comic page -- it'll be the name of the folder for that page of the comic.

### Chapter List
Does your story have multiple chapters? You can define the order of the chapters here and then each comic page can point to a chapter. This way your pages can be sorted and indexed into Chapters. The name of the first comic in the chapter is the name of the comic currently. 

**NOTE:** There's an issue where you have to have a story with a `chapterList`. It's dumb, but I haven't figured out how to deal with that in GraphQL. If you don't need it you can modify the GraphQL queries to uninclude it or just put a dummy chapter in.

## Comic Page Setup

Once you define your book, you'll want to add pages to it. To do that create folders in your new book folder. For example on `long-form-comic` There are folders like `long-form-1` that denotes page 1 of the story.

### Frontmatter for a Comic Page

```
---
title: "Long Form Comic, Page 1"
slug: "long-form-1"
date: "2012-04-30T15:00:35.000Z"
posttype: "comicpage"
comic: "long-form-comic"
chapter: "long-form-chapter-1"
comicImageStack: 
 - "long-form-comic-1.png"
thumbnailImage: "long-form-comic-1.png"
socialMediaImage: "long-form-comic-1.png"
---

<Blogging Markdown stuff here.>
```

### Comic Image vs. Comic Stack
I experimented with two different ways to display comic images. Please use one of these two fields in the frontmatter: 
* `comicImage` - defines a single image for display as the comic
* `comicImageStack` - define an array of comic images for display. The images will be stacked next to each other if you're on a big screen (like a 4K monitor). On mobile they should be stacked vertically similar to Webtoons. The idea was to allow you to do vertical scrolling comics and also break down long vertical scrolling comics into individual images so they could load in parallel instead of all at once as a large file.

**NOTE:** There's an issue where you have to have a story with a `comicImageStack`. It's dumb, but I haven't figured out how to deal with that in GraphQL. If you don't need it you can modify the GraphQL queries to uninclude it or just put a dummy chapter in.

### PostType
Make sure the post type is `comicpage` so the system handles it correctly.

### Chapter 
If the page is apart of a chapter use the `chapter` field to define it.

### Thumbnails
Thumbnails show up in the comic book page under the comic or the chapter header.

Thumbnails can be generated in two ways: 
* User created thumbnail. I tend to create a 512x512 pixel thumbnail. This gives you the most control if you want to highlight something in particular for display on the comic book page.
* Auto-generated thumbnail. A part of the comic page will be cut and used as a thumbnail.

### Social Media Images and Usage
If you want to share your comic over social media and would like control as to what the image shows when you share on Facebook or Twitter or any where that uses a social media card display (i.e. Discord), then fill out this field with the image you create. 

I tend to make an image that's 1200x630 pixels because a Facebook post tends to be that size. Twitter seems pretty friendly with it as well when you post to that platform. 

If you want to check your social media image please use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/). I tend to have to use it to get Facebook to read the opengraph metadata that's generated before I try to post it on their platform.

### Blogging
Below the frontmatter section you are free to add additional markdown for a blog post. I tend to use it for prose story narration or random blogging and author notes. 

# Publishing Comics

## Github
First of all, with this site, I assume you'll be using Github. Your content and the site will be stored on Github. 

If you bristle at the idea of having your comic content stored in Github then you can find different headless CMSes to be your storage partner such as Contentful or Netlify, but I wanted to go minimal and not rely on other external services to host my content.

## Vercel 

I use a third party integration service called [Vercel](https://vercel.com/). You can get a hobbyist tier account here and allow them to link to your Github. Once you make changes, Vercel will pick it up and then build your Gatsby site for you and deploy it.

For example, once you're done authoring your new book or new pages or weekly update all you need to do is upload it to Github and Vercel handles the rest.

**NOTE:** One cavaet: Vercel gives you 1 GB of cache storage for free on their hobbyist tier. If you overflow that cause your comic is too big, then you'll be forced to do a full rebuild of your entire site. This presents a secondary issue: Vercel gives a hobbyist tier 45 minutes of build time before it times out. So if your site is so big that it takes more than 45 minutes to build and it creates a cache size that's more than 1 GB, then you'll have to find another solution.

## Images
Since comics have a lot of images, you'll want to make sure the file size isn't super big. I tend to use a site to compress PNGs down using lossy compression. 

With that said, you'll want to keep your original files outside of the github project. The only images that should go into the content folder are the web-ready images, this means sized and compressed for web display.

## Image file sizes
* Thumbnails: 512x512 px (1:1 square ratio).
* Long form story cover image: 3840x2160 px (16:9 ratio)
* Short form: 2048x2048 px (1:1 square ratio) 
* Comic Images: I tend to do 1140px because that's traditionally what This Mortal Coil was made as, but the comic viewer doesn't care what the image size is. You can do 3840px wide if you want 4K resolution or to have a long page. Images will scale with responsiveness (desktop web vs. mobile). One thing to note if is you do an image stack, if you're display on a 4K screen and your images have a narrow width, they won't stack vertically but rather horizontally until it runs out of space. (I'm of two minds of this -- it's either a bug or a feature).
* Blog Post Images: 2048x2048 (1:1 square ratio)

I use PNGs, but when I compress I use lossy for the highest filesize compression. You probably won't see the difference for most images. Gatsby will take your PNGs and compress to WEBP.

# Authoring Tools
## Visual Code
I use Visual Code for everything because it has built in github integration, markdown support and preview, a built in command line for dealing with running Gatsby and node locally, and plugins for doing some tasks like getting the current UTC datetime for the `date` field.

[Insert Date String](https://marketplace.visualstudio.com/items?itemName=jsynowiec.vscode-insertdatestring) is the Visual Code plugin I use for doing that.

Once you get it you can do `Ctrl+P` in VS Code to get the search file bar. Then type in '>' to get commands. From there type in "Insert Formatted DateTime". When prompted for the date use "iso" to get the UTC timestamp which is what the site uses.