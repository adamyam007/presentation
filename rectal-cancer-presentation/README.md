# Rectal Cancer — Complete 3D Lecture Presentation

A comprehensive, interactive 3D presentation on rectal cancer designed for supervising professors, medical residents, and 4th-year medical students.

## Features

- **38+ Interactive Slides** covering epidemiology, anatomy, diagnosis, staging, management, and follow-up
- **3D Anatomical Models** using Three.js for visual understanding:
  - Interactive rectum segments visualization (lower/mid/upper)
  - Anatomical relations in 3D space
  - TME surgical plane demonstration
- **Professional Medical Graphics** with color-coded staging, survival charts, and flowcharts
- **Clinical Pearls** highlighted throughout
- **Treatment Algorithms** and decision trees
- **Responsive Design** works on laptops, tablets, and projected screens
- **Speaker Notes** support for presenter guidance

## Quick Start

### Option 1: Open Directly in Browser (Recommended)

1. Open the `index.html` file in any modern web browser:
   ```bash
   # From this directory
   open index.html
   # or
   firefox index.html
   # or
   google-chrome index.html
   ```

2. The presentation will load with all content and 3D models

### Option 2: Local Web Server (For Best Performance)

If you have Python installed:

```bash
# Python 3
python -m http.server 8000

# Then open in browser:
# http://localhost:8000
```

Or with Node.js:

```bash
# Install http-server globally (one time)
npm install -g http-server

# Run server
http-server -p 8000

# Then open: http://localhost:8000
```

## Navigation Controls

### Keyboard Shortcuts
- **Arrow Keys (←/→)**: Navigate between slides
- **Arrow Keys (↑/↓)**: Navigate vertical sections
- **Space**: Next slide
- **F**: Enter fullscreen mode
- **S**: Open speaker notes view (presenter mode)
- **O** or **ESC**: Overview mode (see all slides)
- **Home**: Go to first slide
- **End**: Go to last slide
- **B** or **.**: Pause/blackout presentation
- **?**: Show keyboard shortcuts help

### Mouse/Touch
- **Click arrows** at bottom-right to navigate
- **Swipe** on touch devices
- **Scroll wheel**: Can be enabled (currently disabled by default)

## Presentation Structure

### Sections (Total: ~40 minutes + Q&A)

1. **Title Slide** (1 min)
2. **Section A: Introduction & Epidemiology** (3 min)
   - Key statistics
   - Risk factors
3. **Section B: Rectal Anatomy** (5 min)
   - Segments with 3D model
   - Anatomical relations with 3D visualization
   - Vascularization
   - Lymphatic drainage
4. **Section C: Pathophysiology & Carcinogenesis** (4 min)
   - Adenoma-carcinoma sequence
   - MSI pathway
5. **Section D: Clinical Presentation** (3 min)
   - Early and advanced symptoms
   - Complications
6. **Section E: Diagnostic Workup** (6 min)
   - Clinical assessment
   - DRE, colonoscopy
   - MRI, CT, ERUS
   - TNM classification
7. **Section F: Staging & Extension Assessment** (3 min)
   - MRI interpretation
   - Management mapping
8. **Section G: Therapeutic Management** (10-12 min)
   - MDT approach
   - Radiotherapy techniques
   - Chemotherapy protocols
   - Surgical techniques (TME, LAR, APR)
   - Margins and CRM
   - Organ preservation strategies
9. **Section H: Follow-up & Surveillance** (3 min)
   - Surveillance schedule
   - Red flags for recurrence
10. **Section I: Prognosis** (2 min)
    - Stage-based outcomes
11. **Section J: Key Take-Home Messages** (2 min)
12. **Section K: Schematics & Algorithms** (3 min)
    - Treatment algorithms
    - Staging tables
    - Follow-up schedules
13. **Section L: Practical Pearls** (2 min)
14. **Closing & Q&A** (5-10 min)
15. **Appendices** (Reference only)
    - Clinical checklist
    - Timing guide

## Customization

### Modifying Content

Edit `index.html` to customize slides. Each slide is a `<section>` element:

```html
<section>
    <h2>Your Title</h2>
    <p>Your content here</p>
</section>
```

### Changing Theme

Modify the reveal.js theme in `index.html`:

```html
<!-- Change this line -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/theme/white.css">

<!-- To other themes: black, league, sky, beige, simple, serif, blood, night, moon, solarized -->
```

### Adjusting 3D Models

Edit `js/3d-models.js` to modify:
- Colors of anatomical structures
- Camera positions and angles
- Animation speed
- Labels and text

### Custom Styling

Edit `css/custom.css` for:
- Color schemes
- Font sizes
- Spacing and layout
- Print styles

## Presenter Tips

### Before the Talk

1. **Test the presentation** on the actual projection system
2. **Practice with speaker notes** (press `S` to open presenter view)
3. **Check 3D model loading** — ensure internet connection for CDN resources
4. **Print handouts** if needed (use browser print function)
5. **Prepare backup** — have PDF version ready

### During the Talk

1. **Start in fullscreen** (press `F`)
2. **Use speaker notes** to stay on track (press `S`)
3. **Pause for 3D models** — let them rotate for audience viewing
4. **Use overview mode** (`O`) to jump between sections if needed
5. **Engage with algorithms** — walk through decision trees slowly

### Timing Recommendations

- **Introduction & Epidemiology**: 3 min
- **Anatomy**: 5 min (pause for 3D models)
- **Pathophysiology**: 4 min
- **Clinical Presentation & Diagnostics**: 6 min
- **Staging & Management**: 10-12 min (most critical)
- **Follow-up & Prognosis**: 4 min
- **Take-home + Practical Pearls**: 3 min
- **Q&A**: 5-10 min

## Technical Requirements

### Browser Compatibility
- Chrome 90+ (recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

### Internet Connection
- Required for CDN resources (Reveal.js, Three.js)
- Can be made offline by downloading libraries locally

### Screen Resolution
- Optimized for 1280×720 (16:9 aspect ratio)
- Works on 1920×1080 displays
- Responsive for tablets and smaller screens

## Exporting to PDF

### Method 1: Print to PDF (Best Quality)

1. Open presentation in Chrome
2. Add `?print-pdf` to URL: `file:///path/to/index.html?print-pdf`
3. Open print dialog (Ctrl+P or Cmd+P)
4. Select "Save as PDF"
5. Choose "Landscape" orientation
6. Save

### Method 2: Reveal.js Export

Use the [decktape](https://github.com/astefanutti/decktape) tool:

```bash
npm install -g decktape

decktape reveal index.html rectal-cancer-lecture.pdf
```

## Creating Handouts

The appendices include a clinical checklist that can be printed separately:

1. Navigate to Appendix A
2. Print just that slide
3. Distribute to attendees

## Troubleshooting

### 3D Models Not Showing

- Check browser console for errors (F12)
- Ensure internet connection for Three.js CDN
- Try different browser
- Clear browser cache

### Slides Not Advancing

- Check keyboard focus (click on presentation)
- Try different navigation method (mouse clicks)
- Check browser compatibility

### Layout Issues

- Ensure window is in landscape orientation
- Try fullscreen mode (F key)
- Adjust browser zoom to 100%

### Performance Issues

- Close other browser tabs
- Disable browser extensions
- Use Chrome for best performance
- Reduce 3D animation complexity in `3d-models.js`

## Additional Resources

### Creating Your Own Slides

Add new slides between sections:

```html
<section>
    <section>
        <h2>New Section Title</h2>
    </section>

    <section>
        <h2>Subsection 1</h2>
        <p>Content here</p>
    </section>
</section>
```

### Adding More 3D Models

Study `js/3d-models.js` and Three.js documentation:
- [Three.js Docs](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)

### Reveal.js Documentation

- [Reveal.js GitHub](https://github.com/hakimel/reveal.js)
- [Full Documentation](https://revealjs.com/)

## License and Credits

### Presentation Content
- Medical content based on NCCN, ESMO guidelines
- Educational use only

### Libraries Used
- [Reveal.js](https://revealjs.com/) - MIT License
- [Three.js](https://threejs.org/) - MIT License

## Support and Feedback

For issues or improvements:
- Report issues specific to the presentation code
- Suggest medical content updates based on latest guidelines
- Share feedback on presentation effectiveness

## Version History

- **v1.0** (2025-01) - Initial comprehensive presentation
  - 38 slides covering complete rectal cancer curriculum
  - 3D anatomical models for rectum segments and relations
  - Interactive treatment algorithms
  - Complete staging and management protocols

---

## Quick Reference Card

### Essential Shortcuts
| Key | Action |
|-----|--------|
| → | Next slide |
| ← | Previous slide |
| F | Fullscreen |
| S | Speaker notes |
| O | Overview |
| ? | Help |

### Presentation Flow
1. Start → F (fullscreen)
2. During → S (speaker view)
3. Navigate → Arrow keys
4. Questions → O (overview to jump)
5. End → ESC (exit fullscreen)

---

**Ready to present!** Open `index.html` in your browser and press `F` for fullscreen mode.
