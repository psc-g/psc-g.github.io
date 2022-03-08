---
title: "yovoy"
date: 2022-03-07T08:06:25+06:00
hero: /posts/misc/yovoy/banner.png
description: yovoy
menu:
  sidebar:
    name: yovoy
    identifier: yovoy
    parent: misc
    weight: 10
---

# What is a palindrome?

A [palindrome](https://en.wikipedia.org/wiki/Palindrome) is a phrase that reads
the same way from left to right, and right to left. The rules are that all characters
must be used in both directions, but punctuation, capitalization, and spaces can be
ignored.

¡Las mismas reglas en español!

Some well-known Palindromes:

> A man, a plan, a canal, Panama!

> Do geese see god?

> Yo, banana boy!

Unos palíndromos en español:

> Dábale arroz a la zorra el abad.

> La ruta nos aportó otro paso natural.

> Yo voy.

# Make your own palindrome!

I like palindromes but find it hard to think of them in both directions in my head,
so I made this little web tool to help me (and others) make palindromes!

The way it works is you just type in the text area, and the palindrome will appear below.

The checkbox defines whether you have an odd number of letters or not. For instance, the
Spanish palindrome "La ruta nos aportó otro paso natural"
has an even number of letters (the middle 'o' is repeated), but the English palindrome
"Yo, banana boy!" has an odd number of letters (the middle 'a' is not repeated).

All spaces and punctuation will be removed from the bottom text area, but you can add
them in afterwards.

Have fun!

<code>
  <label for="oddPalindrome">Odd-numbered palindrome</label>
  <input type="checkbox" id="oddPalindrome" name="oddPalindrome" value="oddPalindrome" checked=True><br>
  <label for="text">Starter string</label><br>
  <textarea id="text" value="" type="textArea" onInput="generatePalindrome()" rows=4 cols=50 placeholder="Write the start of your palindrome here!"></textarea>

  <label for="palindrome">Palindrome</label><br>
  <textarea id="palindrome" value="" type="textArea" rows=4 cols=50></textarea>
</code>
<div id="graph"></div>
<script src="/posts/misc/yovoy/script.js"></script>
