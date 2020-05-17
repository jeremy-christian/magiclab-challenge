Hi there!

I had a lot of fun with this challenge, it was much more creative than most that I've seen!

I thought I'd use the readme to go over my thinking and design choices.

So the two hurdles I immediately wanted to overcome was the table virtualization and just-in-time loading problems.

Querying the api to retrieve a list of tweets was straightforward, but a common issue to avoid is trying to render them all once you have them.

In a nutshell what you want to achieve is to systematically load / unload dom elements as they scroll in / out of view.

I used a tandem of `react-window` and `react-window-infinite-loader` to overcome this.

I've used them extensively in the past and it's the best-in-class option for react table virtualization in my opinion.

Other libraries I employed were `styled-components`, which is a great CSS utility, though it sometimes scales poorly on large projects.

Ant Design is a nice rich UI library that I just used to plug some components in at the start of the project.

Data flow wise what we're doing is loading an initial 50 tweets, then the fetch request recurses and continues to add more in 2 second intervals.

If we load some tweets and I can see theres a gap in my sequential ids, then I make some dummy data and fire a recursing fetch to load the missing data 50 tweets at a time.

The infinite-loader calls a request for 50 tweets after the last one in the table to keep new tweets coming in as you scroll without loading tweets you're never going to see if you don't scroll down.

I hope you like the demo, let me know what you think!
