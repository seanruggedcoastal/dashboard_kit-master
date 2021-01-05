import React from 'react';


const Scroll = (props) => {
  const [isFetching, setIsFetching] = React.useState(false);

 


  async function handleScrollItems(e) {
    let nextPage = props.currentPage + 1
    
    if (nextPage > props.pages) {
      setIsFetching(false)
      return
    }

    
    
    setTimeout(async() => {
      setIsFetching(false);
      props.getMoreItems()

    }, 2000)
    
  }



  function handleScroll() {
    const ParentContainer = document.getElementById("childrenWrapper")

    if ((ParentContainer.scrollHeight - ParentContainer.scrollTop === ParentContainer.clientHeight) && !isFetching ) {
      setIsFetching(true);
      return
    } else if (isFetching) {
      return
    }

  }


  React.useEffect(() => {
    let vh = window.innerHeight * 0.01 * 88
    document.getElementById("childrenWrapper").style.setProperty('height', `${vh}px`);
    document.getElementById("childrenWrapper").style.setProperty('padding-bottom', `40px`);
    
    document.getElementById("childrenWrapper").addEventListener('scroll', handleScroll);
    return () => document.getElementById("childrenWrapper").removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (!isFetching) return;
    handleScrollItems()
  });

  return (
    <div className={props.className}>
      {props.children}
      {isFetching && <p>Loading...</p>}
    </div>
  )
}

export default Scroll