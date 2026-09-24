import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResumePdf() {
  const doc = await PDFDocument.create();
  // Standard Letter: 612 x 792 pt
  const page = doc.addPage([612, 792]);
  const { width, height } = page.getSize();

  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  const primaryColor = rgb(0.08, 0.08, 0.08);
  const secondaryColor = rgb(0.2, 0.2, 0.2);
  const mutedColor = rgb(0.4, 0.4, 0.4);
  const linkColor = rgb(0.1, 0.4, 0.85);
  const lineRuleColor = rgb(0.85, 0.85, 0.85);

  let y = height - 42;
  const margin = 48;
  const contentWidth = width - margin * 2;

  // Header: Name
  const name = 'Umang Donga';
  const nameWidth = fontBold.widthOfTextAtSize(name, 22);
  page.drawText(name, {
    x: (width - nameWidth) / 2,
    y,
    size: 22,
    font: fontBold,
    color: primaryColor,
  });
  y -= 18;

  // Subtitle: UI/UX Designer
  const subtitle = 'UI/UX Designer';
  const subWidth = fontRegular.widthOfTextAtSize(subtitle, 12);
  page.drawText(subtitle, {
    x: (width - subWidth) / 2,
    y,
    size: 12,
    font: fontRegular,
    color: secondaryColor,
  });
  y -= 16;

  // Contact Info row
  const contactText1 = 'Ahmedabad, Gujarat   |   +91 7874388655   |   umangdonga98@gmail.com   |   ';
  const contactLink = 'linkedin.com/in/umang-donga';
  const totalContactWidth =
    fontRegular.widthOfTextAtSize(contactText1, 9.5) +
    fontRegular.widthOfTextAtSize(contactLink, 9.5);
  const contactStartX = (width - totalContactWidth) / 2;

  page.drawText(contactText1, {
    x: contactStartX,
    y,
    size: 9.5,
    font: fontRegular,
    color: secondaryColor,
  });
  page.drawText(contactLink, {
    x: contactStartX + fontRegular.widthOfTextAtSize(contactText1, 9.5),
    y,
    size: 9.5,
    font: fontRegular,
    color: linkColor,
  });
  y -= 18;

  function drawSectionHeader(title: string) {
    y -= 4;
    page.drawText(title, {
      x: margin,
      y,
      size: 12.5,
      font: fontBold,
      color: primaryColor,
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.8,
      color: lineRuleColor,
    });
    y -= 12;
  }

  function wrapText(text: string, maxWidth: number, font: any, fontSize: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  function drawParagraph(text: string, fontSize = 8.5, font = fontRegular, color = secondaryColor, lineHeight = 11.5) {
    const lines = wrapText(text, contentWidth, font, fontSize);
    for (const line of lines) {
      page.drawText(line, {
        x: margin,
        y,
        size: fontSize,
        font,
        color,
      });
      y -= lineHeight;
    }
  }

  // Summary
  drawSectionHeader('Summary');
  drawParagraph(
    'UI/UX Designer with experience in user research, wireframing, prototyping, interaction design, and high-fidelity UI design. Skilled in Figma, with a user-centered approach to solving complex problems and creating intuitive digital experiences. Experienced in developing end-to-end design solutions across mobile applications, product concepts, and service experiences.',
    8.5,
    fontRegular,
    secondaryColor,
    11.5
  );
  y -= 4;

  // Experience
  drawSectionHeader('Experience');
  page.drawText('Freelance Jewellery Designer', {
    x: margin,
    y,
    size: 9,
    font: fontBold,
    color: primaryColor,
  });
  const compText = ' | Helicx Customized Jewellery';
  page.drawText(compText, {
    x: margin + fontBold.widthOfTextAtSize('Freelance Jewellery Designer', 9),
    y,
    size: 9,
    font: fontRegular,
    color: secondaryColor,
  });
  const expLocation = 'Ahmedabad, Gujarat | 3+ Years';
  const expLocWidth = fontRegular.widthOfTextAtSize(expLocation, 8.5);
  page.drawText(expLocation, {
    x: width - margin - expLocWidth,
    y,
    size: 8.5,
    font: fontRegular,
    color: mutedColor,
  });
  y -= 12;

  drawParagraph(
    'Created customized jewellery designs based on client requirements, preferences, and design specifications.',
    8.5,
    fontRegular,
    secondaryColor,
    10.5
  );
  drawParagraph(
    'Communicated with clients to understand design needs and translated ideas into customized visual concepts.',
    8.5,
    fontRegular,
    secondaryColor,
    10.5
  );
  y -= 4;

  // Education
  drawSectionHeader('Education');
  const colWidth = (contentWidth - 20) / 2;
  const col2X = margin + colWidth + 20;

  // Col 1
  const eduYStart = y;
  page.drawText('M.Des in UI/UX Design (Pursuing)', {
    x: margin,
    y,
    size: 9,
    font: fontBold,
    color: primaryColor,
  });
  page.drawText(' | CGPA: 9.6', {
    x: margin + fontBold.widthOfTextAtSize('M.Des in UI/UX Design (Pursuing)', 9),
    y,
    size: 8.5,
    font: fontRegular,
    color: mutedColor,
  });
  page.drawText('Indus University', {
    x: margin,
    y: y - 11,
    size: 8.5,
    font: fontRegular,
    color: secondaryColor,
  });
  page.drawText('2026-Present', {
    x: margin,
    y: y - 22,
    size: 8,
    font: fontRegular,
    color: mutedColor,
  });

  // Col 2
  page.drawText('Bachelor of Computer Application', {
    x: col2X,
    y,
    size: 9,
    font: fontBold,
    color: primaryColor,
  });
  page.drawText(' | CGPA: 9.6', {
    x: col2X + fontBold.widthOfTextAtSize('Bachelor of Computer Application', 9),
    y,
    size: 8.5,
    font: fontRegular,
    color: mutedColor,
  });
  page.drawText('Silver Oak University, Ahmedabad', {
    x: col2X,
    y: y - 11,
    size: 8.5,
    font: fontRegular,
    color: secondaryColor,
  });
  page.drawText('2021-2024', {
    x: col2X,
    y: y - 22,
    size: 8,
    font: fontRegular,
    color: mutedColor,
  });

  y = eduYStart - 32;

  // Skills
  drawSectionHeader('Skills');
  const skillLine1Label = 'UI/UX: ';
  const skillLine1Val =
    'User Research, User Interviews, User Flows, Information Architecture, Wireframing, Prototyping, High-Fidelity Design, Interaction Design, UI Design, Design Systems, Usability Testing, UX Audits, Responsive Design, Accessibility';
  page.drawText(skillLine1Label, { x: margin, y, size: 8.5, font: fontBold, color: primaryColor });
  const wrappedSkills1 = wrapText(
    skillLine1Val,
    contentWidth - fontBold.widthOfTextAtSize(skillLine1Label, 8.5),
    fontRegular,
    8.5
  );
  page.drawText(wrappedSkills1[0], {
    x: margin + fontBold.widthOfTextAtSize(skillLine1Label, 8.5),
    y,
    size: 8.5,
    font: fontRegular,
    color: secondaryColor,
  });
  y -= 11;
  for (let i = 1; i < wrappedSkills1.length; i++) {
    page.drawText(wrappedSkills1[i], {
      x: margin,
      y,
      size: 8.5,
      font: fontRegular,
      color: secondaryColor,
    });
    y -= 11;
  }

  y -= 2;
  page.drawText('Tools: ', { x: margin, y, size: 8.5, font: fontBold, color: primaryColor });
  page.drawText('Figma, Framer, Adobe Photoshop, Adobe Illustrator, CorelDRAW, Canva', {
    x: margin + fontBold.widthOfTextAtSize('Tools: ', 8.5),
    y,
    size: 8.5,
    font: fontRegular,
    color: secondaryColor,
  });
  y -= 13;

  page.drawText('Design Skills: ', { x: margin, y, size: 8.5, font: fontBold, color: primaryColor });
  page.drawText('Visual Design, Typography, Color Theory, Design Thinking, Problem Solving, User-Centered Design', {
    x: margin + fontBold.widthOfTextAtSize('Design Skills: ', 8.5),
    y,
    size: 8.5,
    font: fontRegular,
    color: secondaryColor,
  });
  y -= 13;

  // Projects
  drawSectionHeader('Projects');

  function drawProject(title: string, subline1: string, subline2: string) {
    page.drawText(title, {
      x: margin,
      y,
      size: 9,
      font: fontBold,
      color: primaryColor,
    });
    y -= 11;
    drawParagraph(subline1, 8.5, fontRegular, secondaryColor, 10.5);
    drawParagraph(subline2, 8.5, fontRegular, secondaryColor, 10.5);
    y -= 4;
  }

  drawProject(
    'Campus Connect - Smart Campus App',
    'Designed an all-in-one campus navigation and information app to help students access classrooms, bus timings, canteen information, hostel services, events, and campus updates.',
    'Designed user flows and navigation experiences to simplify access to essential campus services.'
  );

  drawProject(
    'BookMyShow Kids App - UI/UX Case Study',
    'Designed a kid-friendly movie booking experience for children aged 8–12 with simplified navigation and age-appropriate content.',
    'Conducted user research through survey responses and child interviews to identify usability and safety challenges.'
  );

  page.drawText('Care Band: Product Innovation', {
    x: margin,
    y,
    size: 9,
    font: fontBold,
    color: primaryColor,
  });
  y -= 11;
  drawParagraph(
    'Designed a wearable safety solution combining QR-based identification, location tracking, and emergency information.',
    8.5,
    fontRegular,
    secondaryColor,
    10.5
  );
  drawParagraph(
    'Defined the user experience around quick access to essential user information during emergency situations.',
    8.5,
    fontRegular,
    secondaryColor,
    10.5
  );

  // Portfolio right below
  const portLabel = 'Portfolio: ';
  const portLink = 'behance.net/umangdonga';
  const portTotalWidth = fontBold.widthOfTextAtSize(portLabel, 8.5) + fontRegular.widthOfTextAtSize(portLink, 8.5);
  page.drawText(portLabel, {
    x: width - margin - portTotalWidth,
    y,
    size: 8.5,
    font: fontBold,
    color: linkColor,
  });
  page.drawText(portLink, {
    x: width - margin - portTotalWidth + fontBold.widthOfTextAtSize(portLabel, 8.5),
    y,
    size: 8.5,
    font: fontRegular,
    color: linkColor,
  });
  y -= 12;

  // Certificates
  drawSectionHeader('Certificates');

  const certs = [
    { title: 'Google UX Design Professional Certificate', issuer: 'Google | Coursera | 2026' },
    { title: 'IBM UI/UX Designer Certificate', issuer: 'IBM | 2026' },
    { title: 'Generative AI: Prompt Engineering Basics', issuer: 'IBM | Coursera | 2026' },
    { title: 'Generative AI Mastermind', issuer: 'Outskill | 2026' },
    { title: 'Python 3.4.3 Training', issuer: 'Spoken Tutorial Project | 2024' },
  ];

  for (const cert of certs) {
    page.drawText(`•  ${cert.title}`, {
      x: margin,
      y,
      size: 8.5,
      font: fontRegular,
      color: primaryColor,
    });
    const issuerWidth = fontRegular.widthOfTextAtSize(cert.issuer, 8.5);
    page.drawText(cert.issuer, {
      x: width - margin - issuerWidth,
      y,
      size: 8.5,
      font: fontRegular,
      color: secondaryColor,
    });
    y -= 11.5;
  }

  const pdfBytes = await doc.save();
  const outputPath = path.resolve('public/Umang_Donga_Resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('Resume PDF successfully written to', outputPath);
}

generateResumePdf().catch(console.error);
