# React MasterSelect

A wrapper around [react-select](https://www.npmjs.com/package/react-select) that add some master/slave behaviors.

[![Build Status](https://travis-ci.org/keul/react-masterselect.svg?branch=master)](https://travis-ci.org/keul/react-masterselect)
[![Dependencies](https://img.shields.io/david/keul/react-masterselect.svg)]()
[![Dev Dependencies](https://img.shields.io/david/dev/keul/react-masterselect.svg)]()

## Live demo

https://keul.github.io/react-masterselect/

## How to use

### Installation

`npm install` or `yarn install`

### Import

This is the common `react-select` import:

```javascript
import Select from 'react-select';
```

Change it as follow:

```javascript
import MasterSelect from 'react-masterselect';
```

The `MasterSelect` component can be used in the same way as `Select` can but if you provide more props and structure your app in the proper way, you can get new features.

### Examples

```javascript
  <MasterSelect
    id="master"
    options={[
      {label: 'Value 1' value: 'value1'},
      {label: 'Value 2' value: 'value2'},
    ]}
    value={this.state.master}
    onChange={selected => {
      this.setState({ master: selected });
    }}
    ref={select => {
      this.fields.master = select;
    }}
    selects={this.fields}
    slaves={[
      {
        id: 'slave',
        action: 'optionsChange',
        rules: {
          value2: ['valuea', 'valuec']
        }
      },
    ]}
  />
  <MasterSelect
    id="slave"
    options={[
      {label: 'Value A' value: 'valuea'},
      {label: 'Value B' value: 'valueb'},
      {label: 'Value C' value: 'valuec'},
    ]}
    value={this.state.slave}
    onChange={selected => {
      this.setState({ slave: selected });
    }}
    ref={select => {
      this.fields.slave = select;
    }}
    selects={this.fields}
  />
```

When selecting `value2` from the master select, only `valuea` and `valuec` on the slave will be available.

In this case we limited the slave's set by filtering options that were already present.

Another example:

```javascript
  <MasterSelect
    id="master"
    options={[
      {label: 'Value 1' value: 'value1'},
      {label: 'Value 2' value: 'value2'},
    ]}
    value={this.state.master}
    onChange={selected => {
      this.setState({ master: selected });
    }}
    ref={select => {
      this.fields.master = select;
    }}
    selects={this.fields}
    slaves={[
      {
        id: 'slave',
        action: 'optionsChange',
        rules: {
          value2: [
            'valuea',
            {label: 'Value B' value: 'valueb1'}
            {label: 'Value D' value: 'valued'}
          ]
        }
      },
    ]}
  />
  <MasterSelect
    id="slave"
    options={[
      {label: 'Value A' value: 'valuea'},
      {label: 'Value B' value: 'valueb'},
      {label: 'Value C' value: 'valuec'},
    ]}
    value={this.state.slave}
    onChange={selected => {
      this.setState({ slave: selected });
    }}
    ref={select => {
      this.fields.slave = select;
    }}
    selects={this.fields}
  />
```

In this example we are both reusing an options already defined in the slave's set, but also adding new ones.

### New props

* *id*: the same id you can pass to `react-masterselect` but it's required
* *selects*: an object containing a reference to all of the selects that take place in the master/slave behavior.
  You can commonly build it using [ref](https://reactjs.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-dom-element) (see below).
* *slaves* : an array of complex structures shaped as follow:

  ```javascript
  PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
      rules: PropTypes.object
    })
  )
  ```
  where:

  * *id* is an id prop of a slave select
  * *action* is the type of action.
  * *rules*: based on action, those are the change rules to be applied to slaves.

### Type of actions

The only supported type of `action` for now is `optionsChange`, so `rules` describe how slave's options should change:

The `rules` array can be a list of values, or a list of react-select `Select` compatible new options, or both (mixed).

When you provide a simple value, this mean that the same option whit that value in the original option set is kept (while other are discarded).

If you provide an object, it's used to extends the original options set of the `Select`.

## Limitations

* [Select.Async](https://www.npmjs.com/package/react-select#async-options) is not currently supported
* needs more types of `action`s

## Credits

Loosely inspired by some MasterSelect widgets implemented by the Plone CMS.

## Development

Start development server

`npm start` or `yarn start`

This runs the demo app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

To run tests:

`npm run test` or `yarn run test`
