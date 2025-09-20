const http = require("http");
const port = 7777;


const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });

  if (req.url === "/") {
    res.end("Hello World from nodejs server");
  } else if (req.url === "/test") {
    res.end("Hello World from test endpoint");
  } else if (req.url === "/hello") {
    res.end("Hello World from hello endpoint");
  } else if(req.url === "/order") {
    res.end("Hello World from order endpoint");
  }
});

server.listen(port, () => {
  console.log("Server is listening on ", port);
});
