Hi there!

I had a lot of fun with this challenge, it was much more creative than most that I've seen!

I thought I'd use the readme to go over my thinking and design choices.

So the two hurdles I immediately wanted to overcome was the table virtualization and just-in-time loading problems.

Querying the api to retrieve a list of tweets was straightforward, but a common issue to avoid is trying to render them all once you have them.

`react-window` is a neat little virtualization library that got me around the first problem.

In a nutshell what you want to achieve is to systematically load / unload dom elements as they scroll in / out of view.

The library works super well on that front, but its companion library that I used to solve the loading problem is less ideal.

Getting `react-window-infinite-loader` to load older tweets as you scroll _down_ was very straightforward, but in an ideal world I'd have liked to be able to have it both ways so that tweets you can't see above you would only load when you scrolled them into view too.

Another issue I could see was that just because you could query the api for the latest tweets, that doesn't guarantee that you'll get all of them!

The workaround to that was to figure out how many were missing from the payload and provide dummy data while you loaded them, which was easy.

Something else I'd have liked to achieve would be to load the missing tweets in the order that the user needed to see them, so as you scroll upwards towards your potentially missing items you'd have the best chances of loading the ones the user was most likely to see first.
