# React application example with Wakanda-Client

This is a very simple React application that uses Wakanda backend through
[Wakanda-Client](https://github.com/Wakanda/wakanda-javascript-client).

## Install

```bash
npm install
```

## Launch

1. Open `employeelist` Wakanda solution contained on `employeelist/` directory on Wakanda Studio and launch the Server.
*There is no need to use *Run Page* as the app is not served by Wakanda Server*.

2. Run both a simple web server (`http-server`) and TypeScript transpilation with WebPack.

 ```bash
npm run serve
```

3. Once the transpilation is done, go to `http://localhost:8989`, your app is ready!

## Notes

Few things to note:

- `Wakanda-Client` is still on beta and might have some issues
- I'm really new to React, some usage might be bad, feel free to tell me in such case :)
- `Wakanda-Client`, in its current state, doesn't fit well with React, because of the way it's made, and the
particular way React works
