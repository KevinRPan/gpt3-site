import './styles.css';

function App({ Component, pageProps }) {
  return (
    <>
      <head>
        <title>Generated Games</title>
      </head>
      <Component {...pageProps} />
    </>
  )
}
export default App;
