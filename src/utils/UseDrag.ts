import { useEffect, useRef, useState } from 'react';

const useDrag = (onDragComplete?: (direction: string) => void) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [originalPos, setOriginalPos] = useState<{ x: number; y: number } | null>(null);
  const dragItemRef = useRef<HTMLDivElement>(null);

  // Kezdő pozíció beállítása és stílus resetelése
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });

    if (dragItemRef.current) {
      const rect = dragItemRef.current.getBoundingClientRect();
      setOriginalPos({ x: rect.left, y: rect.top });
      dragItemRef.current.style.transition = ''; // Transition kikapcsolása
      dragItemRef.current.style.opacity = '1'; // Biztosítja a láthatóságot
    }
  };

  // Húzás közbeni mozgás kezelése
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !startPos || !dragItemRef.current) return;

    const clientX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
    const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;

    // Húzás animálása
    dragItemRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    const tilt = Math.min(Math.max(deltaX / 10, -45), 45);
    dragItemRef.current.style.transform += ` rotate(${tilt}deg)`;
  };

  // Húzás befejezése és irány meghatározása
  const handleMouseUp = () => {
    if (!originalPos || !dragItemRef.current) return;

    const currentPos = dragItemRef.current.getBoundingClientRect();
    const distanceDragged = Math.sqrt(
      Math.pow(currentPos.left - originalPos.x, 2) + Math.pow(currentPos.top - originalPos.y, 2)
    );

    const deltaX = currentPos.left - originalPos.x;
    const deltaY = currentPos.top - originalPos.y;

    if (distanceDragged > 200) {
      let direction = '';

      // Irány meghatározása
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'like' : 'dislike'; // Jobbra vagy balra
      } else {
        direction = deltaY > 0 ? '' : 'mark'; // Felfelé vagy lefelé
      }

      if (onDragComplete) {
        onDragComplete(direction); // Callback hívása az irány átadásával
      }

      // Húzás utáni eltüntetés
      dragItemRef.current.style.transition = 'opacity 0.5s ease, transform 0s'; 
      dragItemRef.current.style.opacity = '0'; // Eltüntetés

      setTimeout(() => {
        if (dragItemRef.current) {
          dragItemRef.current.style.transform = 'translate(0, 0) rotate(0deg)'; // Visszaállítás
          dragItemRef.current.style.opacity = '1'; // Újra látható
          dragItemRef.current.style.transition = ''; // Transition kikapcsolása
        }
      }, 500);
    } else {
      // Húzás nem teljesítése esetén visszaállítás animációval
      dragItemRef.current.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
      dragItemRef.current.style.transform = 'translate(0, 0) rotate(0deg)';
      dragItemRef.current.style.opacity = '1';
    }

    setIsDragging(false);
    setStartPos(null);
  };

  // Eseménykezelők hozzáadása
  const addEventListeners = () => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
  };

  // Eseménykezelők eltávolítása
  const removeEventListeners = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('touchmove', handleMouseMove);
    window.removeEventListener('touchend', handleMouseUp);
  };

  useEffect(() => {
    if (isDragging) {
      addEventListeners(); // Eseménykezelők aktiválása húzáskor
    } else {
      removeEventListeners(); // Eseménykezelők eltávolítása
    }

    return () => removeEventListeners(); // Tisztítás
  }, [isDragging]);

  return { isDragging, startPos, dragItemRef, handleMouseDown };
};

export default useDrag;
