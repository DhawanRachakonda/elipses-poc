import logo from './logo.svg';
import './App.css';
import { useEffect, useLayoutEffect, useRef, useCallback, useState } from 'react';

const text="yedgyshgysdhgdgsydhdendkdkknsxknahsuhdkxksanuhusdnsknksncgyucnksncahusucnajshcugcucsnjcan"

// one letter is equal to 10 px
function App() {
  const elipsesContainerRef = useRef(null);
  const [ellipseContainerClass, setEllipseContainerClass] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const onDivResize = useCallback(function () {
    console.log("Scroll Width", elipsesContainerRef.current.scrollWidth, " Width", elipsesContainerRef.current.clientWidth, " Text Length", text.length);
    if(elipsesContainerRef.current.scrollWidth > elipsesContainerRef.current.clientWidth) {
      // add ellipse since text is greater than width
      setEllipseContainerClass("elipses-container")
    } else {
      setEllipseContainerClass("")
    }
  }, [elipsesContainerRef])
  
  useLayoutEffect(() => {
    window.addEventListener('resize', onDivResize);
    return () => {
      window.removeEventListener('resize', onDivResize);
    }
  }, [elipsesContainerRef]);

  const onMouseOverOnContainer = useCallback(function () {
    if(elipsesContainerRef.current.scrollWidth > elipsesContainerRef.current.clientWidth) {
      !showPopup && setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [elipsesContainerRef]);

  const disablePopup = () => {
    setShowPopup(false);
  }

  return (
    <div>
      <br/><br/><br/><br/>
      {showPopup && <p class="popup">{text}</p>}
      <div className={ellipseContainerClass} onMouseOver={onMouseOverOnContainer} onMouseOut={disablePopup} ref={elipsesContainerRef}>{text}</div>
    </div>
  );
}

export default App;
