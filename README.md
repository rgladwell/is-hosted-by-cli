# Is Hosted By Command Line Tool

Command line tool for discovering the hosting provider for any address.
Uses the [Is Hosted By API](https://is-hosted-by.com/)

Requirements:

  * Node

To install:

```sh
$ npm i -g is-hosted-by-cli
```

To run:

```sh
$ whohosts http://amazon.com
amazon.com is hosted by Amazon
```

## Development

To set-up for development, from a cloned folder run:

```sh
$ npm install
```

To test locally:

```sh
$ npm link
$ whohosts http://heroku.com
```

To run tests:

```sh
$ npm run test
```

## License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this program.  If not, see
<http://www.gnu.org/licenses/>.

Copyright 2015-2016 [Ricardo Gladwell](http://gladwell.me).
