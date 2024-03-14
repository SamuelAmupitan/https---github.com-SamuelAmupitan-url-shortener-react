import React, { useRef, useState, useEffect } from 'react';
import Features from '../../components/Features';
import Footer from '../../components/Footer';
import Form from '../../components/Form';
import { Header } from '../../components/Header';
import Nav from '../../components/Nav';
import Optimize from '../../components/Optimize';
import { Pricing } from '../../components/Pricing';
import Questions from '../../components/Questions';
import Sidebar from '../../components/Sidebar';
import Views from '../../components/Views';
import ShortLink from "../../components/ShortenedLink";
import ConfirmationDialog from '../../components/ConfirmationDialog';
import Spinner from '../../components/Spinner';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const nav = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const scrollToView = (e, id) => {
    e.preventDefault();
    if (!id) return;
    const element = document.querySelector(`#${id}`);
    const navHeight = nav.current.getBoundingClientRect().height;
    const fixedNav = nav.current.classList.contains('sticky');
    let position = element.offsetTop - navHeight;
    if (!fixedNav) {
      position -= navHeight;
    }
    window.scrollTo({
      left: 0,
      top: position,
      behavior: 'smooth',
    });
  };

  const handleFormSubmit = async (longUrl: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.tinyurl.com/create?api_token=sX9Z93j8f6BRAy10xkh4esULwnyvDrUO5LaMgmLjGFLKSiMJenrmFsmiv0jD",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: longUrl,
            domain: "tinyurl.com",
            description: "string",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const result = data.data.tiny_url;
        setShortUrl(result);
        setQrCode(result);
      } else {
        console.error("Error", response.statusText);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmRemove = () => {
    setShortUrl("");
    setQrCode("");
    setIsConfirmationOpen(false);
  };

  const handleCancelRemove = () => {
    setIsConfirmationOpen(false);
  };

  const logout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <Nav
        scrollToView={scrollToView}
        nav={nav}
        onSidebarOpen={handleOpenSidebar}
        sidebarOpen={sidebarOpen}
      />
      <Header />
      <Views />
      <Features />
      <Pricing />
      {!shortUrl && !isLoading && <Form onSubmit={handleFormSubmit} />}
      {isLoading && <Spinner isLoading={isLoading} />}
      {shortUrl && (
        <ShortLink
          url={shortUrl}
          qrCode={qrCode}
          onDelete={() => setIsConfirmationOpen(true)}
        />
      )}

      <Questions />
      <Optimize />
      <Footer />
      <Sidebar
        sidebarOpen={sidebarOpen}
        onSidebarClose={handleCloseSidebar}
        scrollToView={scrollToView}
      />
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
      />
    </>
  );
}

export default App;
