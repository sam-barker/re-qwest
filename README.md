# re-qwest
Promise-ifies XMLHttpRequest/XDomainRequest whilst using CORS.

# Usage
```
import reqwest from 're-qwest'

// Make a request
reqwest({
  method: 'GET',
  url: 'https://exampleurl.com/api/v1/example/1',
}).then((response) => {
  const data = JSON.parse(response)
  console.log(data)
}).catch((error) => {
  console.log(error)
})
```

# Paramaters
The reqwest function takes an object with the following properties:
```
{
  method: The `HTTP` method to use (string),
  url: The url to aim the request at (string),
  params: additional query parameters you wish to send with the request (object),
  headers: Request headers(object),
  props: Additional properties you wish to add to the request object, such as `withCredentials` (object)
}
```

For details on what can be used in regards to `headers` and `props`, see the documentation on XMLHttpRequest https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

