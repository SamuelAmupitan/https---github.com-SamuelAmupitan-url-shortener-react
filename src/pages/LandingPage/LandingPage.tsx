import React, { useEffect, useRef, useState } from 'react';
import { Header } from '../../components/Header';
import Nav from '../../components/Nav';
import Features from '../../components/Features';
import Footer from '../../components/Footer';
import Form from '../../components/Form';
import Views from '../../components/Views';
import { Pricing } from '../../components/Pricing';
import Questions from '../../components/Questions';
import Optimize from '../../components/Optimize';
import ShortLink from "../../components/ShortenedLink";
import ConfirmationDialog from '../../components/ConfirmationDialog';
import Spinner from '../../components/Spinner';
import Sidebar from '../../components/Sidebar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { User } from 'firebase/auth'; 

function LandingPage() {
  const nav = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [shortUrl, setShortUrl] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, () => {
    });
    return () => unsubscribe();
  }, []);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const scrollToView = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (!id) return;
    const element = document.querySelector(`#${id}`) as HTMLElement; 
    const navHeight = nav.current?.getBoundingClientRect().height || 0;
    const fixedNav = nav.current?.classList.contains('sticky') || false;
    let position = element?.offsetTop - navHeight;
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


  return (
    <>
      <Nav
        scrollToView={scrollToView}
        // nav={nav} 
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
      <Footer  />
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

export default LandingPage;
