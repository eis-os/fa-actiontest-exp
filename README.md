#FA Action Test#
Experimental icon font project using unicode "no-space" like characters.

See https://github.com/nyon/fontawesome-actions for a working but different solution

Note: The fa-actiontest-exp.html is 2MB!

##Description
This is a test project for adding new actions by combining unicode characters.
Icon glphys should have the same size and a default place for a action, this reduces the necessary glphys:

icons*actions => icons + iconswithplaceholder + actions

##License
- The Font Awesome and generated fonts are licensed under the SIL OFL 1.1:
  - http://scripts.sil.org/OFL

- Font Awesome CSS is licensed under the MIT License:
  - http://opensource.org/licenses/mit-license.html

- src/template files are based on grunt-webfont licensed under the MIT License
  - https://github.com/sapegin/grunt-webfont

##Rebuilding
Grunt target **default** should build new files under public, use **src/toactionlist.yml** to select svgs for creating actions.

##Problems
- No space means actually 5 units, (svgicons2svgfont / grub-webfont are not designed for such glyphs)
- Huge css and html files
- CSS is not quite font-awesome compatible

