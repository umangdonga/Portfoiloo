/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { Skills } from './components/Skills';
import { DesignHighlights } from './components/DesignHighlights';
import { SelectedWorks } from './components/SelectedWorks';
import { DesignProcess } from './components/DesignProcess';
import { Tools } from './components/Tools';
import { Education } from './components/Education';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ImageModal } from './components/ImageModal';

export default function App() {
  const [modalImage, setModalImage] = useState<{ url: string; title: string } | null>(null);

  const RESUME_URL = import.meta.env.VITE_RESUME_URL || '/Umang_Donga_Resume.pdf';
  const BEHANCE_URL = 'https://www.behance.net/umangdonga';
  const LINKEDIN_URL = 'https://www.linkedin.com/in/umangdonga24/';
  const EMAIL = 'umangdonga98@gmail.com';
  const BRANDING_IMG_URL =
    'https://framerusercontent.com/images/UKZThasTvYasYGhPlVWEzjKKegQ.png?width=1563&height=1006';
  const CONTACT_CARD_IMG_URL =
    'https://framerusercontent.com/images/nZBBhSG8QSZeBV0BJzaEIzAhaa0.png?width=755&height=717';

  const handleOpenImage = (url: string, title: string) => {
    setModalImage({ url, title });
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#4181f0] selection:text-white">
      {/* Top Navbar */}
      <Navbar resumeUrl={RESUME_URL} />

      <main>
        {/* Hero Section */}
        <Hero
          behanceUrl={BEHANCE_URL}
          linkedinUrl={LINKEDIN_URL}
          resumeUrl={RESUME_URL}
        />

        {/* Marquee Ticker */}
        <Ticker />

        {/* My Skills Section */}
        <Skills brandingImageUrl={BRANDING_IMG_URL} />

        {/* Education Section (after My Skills) */}
        <Education />

        {/* Design Highlights Gallery */}
        <DesignHighlights onSelectImage={handleOpenImage} />

        {/* Selected Works (Accordion matching image.png) */}
        <SelectedWorks onSelectImage={handleOpenImage} />

        {/* Design Process */}
        <DesignProcess />

        {/* Tools I Work With */}
        <Tools />

        {/* Certificates */}
        <Certificates onSelectImage={handleOpenImage} />

        {/* Contact Form & Information */}
        <Contact
          cardImageUrl={CONTACT_CARD_IMG_URL}
          email={EMAIL}
          behanceUrl={BEHANCE_URL}
          linkedinUrl={LINKEDIN_URL}
        />
      </main>

      {/* Footer */}
      <Footer
        behanceUrl={BEHANCE_URL}
        linkedinUrl={LINKEDIN_URL}
      />

      {/* Lightbox Image Preview Modal */}
      <ImageModal
        isOpen={!!modalImage}
        imageUrl={modalImage?.url || null}
        title={modalImage?.title || null}
        onClose={handleCloseModal}
      />
    </div>
  );
}
