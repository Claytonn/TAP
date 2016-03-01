# TAP - Text Area Processor 
#### Text highlighter and HTML formatter. Format textarea inputs with regex patterns.

#### Usage

> new tap(element, options);

**Element paramenter expects textarea inputs only**

#### Example Usage
```
// Instantiate TAP
var textArea = new tap(element, {

	patterns: [
	{
			regex: ['(@\\w{1,15})', 'gi'], // RegExp [pattern, flag]
			element: 'span', // Wrapping Tag
			attributes: {
				// Element Attributes
				class: 'tap-username'
			}
		},
		{
			regex: ['\\b(link)\\b', 'gi'],
			element: 'a',
			attributes: {
				class: 'tap-link',
				href: 'http://claytonn.com'
			}
		}
		]
	});
```

