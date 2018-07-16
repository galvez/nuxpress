# nuxpress: Minimalist Plain Text blogging

**nuxpress** is the result of me reading through [VuePress][1]'s source code for
a week. It doesn't have blogging support yet, so I set out to try and cook 
something up with it.

I learned a lot reading through Evan's code, but my feeling is that VuePress
goes to great lenghts to replicate [Nuxt][2]'s functionality for automatically 
setting up and launching a Vue app, and while I see the value of having 
`vuepress` as a standalone CLI tool and everything it does that Nuxt doesn't
(e.g., all SEO-friendly publishing tweaks), for me really its golden feature is 
streamlining Markdown in Vue files. And it's why I think VuePress should stay
focused on documentation, which it does really well.

Now, I **really like** Nuxt's code organization standards. Having a blog as
a Nuxt app makes sense, as it would give me total freedom for customization.
VuePress's `eject` command gives you a similar functionality, but you miss
the multitude of plugins and Nuxt-oriented solutions out there.

So instead of trying to add blogging support to VuePress, I decided to add 
Markdown blogging support to a Nuxt app with the minimum amount of code 
and conventions I could possibly manage.

# Where the magic happens

