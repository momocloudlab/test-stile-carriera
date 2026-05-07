import React, { useState, useMemo } from 'react';
import { 
  Sparkles, ArrowRight, Printer, Send, Map, 
  Unlink, Milestone, CheckCircle2, ChevronRight, UserCheck
} from 'lucide-react';

export default function CareerStyleApp() {
  const [step, setStep] = useState<'welcome' | 'user-info' | 'test' | 'result'>('welcome');
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ Protean: 0, Boundaryless: 0 });

  const questions = [
    { id: 1, text: "Per me è fondamentale che il mio lavoro rifletta i miei valori personali, non solo quelli aziendali", dim: "Protean" },
    { id: 2, text: "Sono io il principale responsabile della mia carriera, non l'azienda per cui lavoro", dim: "Protean" },
    { id: 3, text: "Preferisco seguire ciò che ritengo giusto piuttosto che seguire un percorso predefinito da altri", dim: "Protean" },
    { id: 4, text: "Mi sento gratificato quando raggiungo traguardi che io considero importanti, a prescindere dai premi formali", dim: "Protean" },
    { id: 5, text: "Mi piace l'idea di lavorare su progetti con persone che appartengono ad aziende diverse dalla mia", dim: "Boundaryless" },
    { id: 6, text: "Non mi spaventa l'idea di cambiare settore o azienda frequentemente se questo mi arricchisce", dim: "Boundaryless" },
    { id: 7, text: "Preferisco focalizzarmi sulle mie competenze tecniche piuttosto che scalare la gerarchia di una singola azienda", dim: "Boundaryless" },
    { id: 8, text: "Il mio network professionale si estende molto al di fuori della mia attuale organizzazione", dim: "Boundaryless" },
    { id: 9, text: "Se i miei valori entrano in conflitto con quelli dell'azienda, sarei pronto a cambiare lavoro", dim: "Protean" },
    { id: 10, text: "Considero i confini aziendali come qualcosa di superabile per collaborare e crescere", dim: "Boundaryless" },
    { id: 11, text: "Cerco attivamente opportunità per imparare cose nuove, anche se non servono al mio ruolo attuale", dim: "Protean" },
    { id: 12, text: "Mi trovo a mio agio in situazioni lavorative che richiedono contatti con realtà esterne diverse", dim: "Boundaryless" }
  ];

  const profiles: any = {
    Protean: {
      title: "Il Navigatore Autonomo (Protean)",
      desc: "La tua carriera è guidata da una bussola interna infallibile: i tuoi valori. Non aspetti che sia l'azienda a dirti cosa fare, sei tu il capitano della tua nave. La tua libertà e la coerenza con te stesso valgono più di qualsiasi titolo sulla scrivania.",
      tip: "La tua forza è l'integrità. Assicurati però di non isolarti troppo: a volte collaborare con strutture più rigide può darti le risorse per realizzare i tuoi grandi progetti personali.",
      icon: <UserCheck />, color: "#701a75"
    },
    Boundaryless: {
      title: "L'Esploratore Senza Confini",
      desc: "Per te l'azienda è solo uno dei tanti luoghi dove esprimerti. Abbatti i confini, crei ponti tra realtà diverse e la tua mobilità (mentale e fisica) è la tua arma segreta. Sei un nomade del talento che porta valore ovunque vada.",
      tip: "Sei eccellente nel networking. Il consiglio? Cerca di lasciare un'impronta profonda in ogni realtà che attraversi, per non rischiare che la tua mobilità venga scambiata per mancanza di appartenenza.",
      icon: <Unlink />, color: "#d946ef"
    }
  };

  const handleAnswer = (val: number) => {
    const dim = questions[currentIdx].dim;
    setScores(prev => ({ ...prev, [dim]: prev[dim] + val }));
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
    else setStep('result');
  };

  const dominant = useMemo(() => {
    return scores.Protean >= scores.Boundaryless ? "Protean" : "Boundaryless";
  }, [scores, step]);

  const sendEmail = () => {
    const subject = encodeURIComponent(`Stile di Carriera - ${userData.name}`);
    const body = encodeURIComponent(`Ciao ${userData.name}!\n\nEcco il tuo stile di carriera:\n\n${profiles[dominant].title}\n${profiles[dominant].desc}\n\nConsiglio: ${profiles[dominant].tip}`);
    window.location.href = `mailto:${userData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="app-wrapper">
      <style>{`
        .app-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #FDFBFE; font-family: 'Segoe UI', Roboto, sans-serif; padding: 20px; }
        .card { max-width: 750px; width: 100%; background: white; border-radius: 45px; box-shadow: 0 40px 80px rgba(112,26,117,0.12); overflow: hidden; border: 1px solid #f3e8ff; }
        .content { padding: 50px; text-align: center; }
        .icon-header { background: #701a75; color: white; padding: 25px; border-radius: 28px; display: inline-flex; margin-bottom: 30px; box-shadow: 0 20px 40px rgba(112,26,117,0.2); rotate: 3deg; }
        h1 { color: #0f172a; font-size: 45px; font-weight: 900; margin: 0; letter-spacing: -2px; }
        .text-accent { color: #701a75; }
        .subtitle { color: #64748b; font-size: 19px; margin: 25px 0 45px; line-height: 1.6; }
        .btn-main { background: #1e293b; color: white; width: 100%; padding: 22px; border-radius: 22px; font-weight: 800; font-size: 18px; border: none; cursor: pointer; transition: all 0.3s; }
        .btn-main:hover { background: #701a75; transform: translateY(-2px); }
        .input-field { width: 100%; padding: 20px; background: #f8fafc; border: 2px solid transparent; border-radius: 22px; margin-bottom: 15px; font-size: 16px; outline: none; box-sizing: border-box; }
        .likert-btn { width: 100%; text-align: left; padding: 22px; background: white; border: 2px solid #f1f5f9; border-radius: 22px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .likert-btn:hover { border-color: #701a75; background: #faf5ff; }
        .likert-btn span { font-weight: 700; color: #334155; }
        .progress-bar { height: 8px; background: #f1f5f9; width: 100%; }
        .progress-fill { height: 100%; background: #701a75; transition: width 0.4s; }
        .result-box { background: #0f172a; color: white; padding: 45px; border-radius: 40px; margin: 30px 0; text-align: left; }
        .tip-box { background: #f5f3ff; border-left: 5px solid #701a75; padding: 20px; border-radius: 15px; color: #4c1d95; margin-top: 20px; }
        @media print { .no-print { display: none; } }
      `}</style>

      <div className="card">
        {step === 'test' && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((currentIdx + 1) / 12) * 100}%` }}></div>
          </div>
        )}

        <div className="content">
          {step === 'welcome' && (
            <div>
              <div className="icon-header"><Milestone size={45} /></div>
              <h1>Stile di<br/><span className="text-accent">Carriera</span></h1>
              <p className="subtitle">Scoprì la tua filosofia lavorativa: sei un professionista guidato dai valori o un esploratore senza confini?</p>
              <button onClick={() => setStep('user-info')} className="btn-main">Analizza il mio Stile</button>
            </div>
          )}

          {step === 'user-info' && (
            <div>
              <h2 style={{fontSize: '36px', fontWeight: '900'}}>Quasi pronti!</h2>
              <p className="subtitle">Inserisci i tuoi dati per ricevere il tuo profilo di carriera.</p>
              <input type="text" placeholder="Nome completo" className="input-field" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} />
              <input type="email" placeholder="Email" className="input-field" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} />
              <button disabled={!userData.name || !userData.email} onClick={() => setStep('test')} className="btn-main" style={{opacity: !userData.name ? 0.3 : 1}}>Inizia il Test</button>
            </div>
          )}

          {step === 'test' && (
            <div style={{textAlign: 'left'}}>
              <span style={{color: '#701a75', fontWeight: '900', fontSize: '12px', textTransform: 'uppercase'}}>Stile di Carriera - Domanda {currentIdx + 1} di 12</span>
              <h2 style={{fontSize: '28px', margin: '15px 0 30px', lineHeight: '1.2'}}>{questions[currentIdx].text}</h2>
              {[
                {l: "Assolutamente no", d: "Non mi rispecchia affatto"},
                {l: "Raramente", d: "Mi capita solo in rare occasioni"},
                {l: "Spesso", d: "È un modo di pensare che applico regolarmente"},
                {l: "Totalmente", d: "È esattamente come vedo la mia carriera"}
              ].map((choice, i) => (
                <button key={i} onClick={() => handleAnswer(i + 1)} className="likert-btn">
                  <div>
                    <span>{choice.l}</span><br/>
                    <small style={{color: '#94a3b8'}}>{choice.d}</small>
                  </div>
                  <ChevronRight size={20} color="#701a75" />
                </button>
              ))}
            </div>
          )}

          {step === 'result' && (
            <div>
              <CheckCircle2 size={60} color="#22c55e" style={{marginBottom: '20px'}} />
              <h1>Risultato per {userData.name}</h1>
              <div className="result-box">
                <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
                  <div style={{background: 'white', color: '#0f172a', padding: '10px', borderRadius: '12px'}}>
                    {profiles[dominant].icon}
                  </div>
                  <h3 style={{fontSize: '28px', margin: 0}}>{profiles[dominant].title}</h3>
                </div>
                <p style={{fontSize: '18px', lineHeight: '1.7', color: '#cbd5e1'}}>
                  {profiles[dominant].desc}
                </p>
                <div className="tip-box">
                  <strong>💡 Consiglio Strategico:</strong> {profiles[dominant].tip}
                </div>
              </div>
              <div style={{display: 'flex', gap: '15px'}} className="no-print">
                <button onClick={() => window.print()} className="btn-main" style={{flex: 1}}>Salva PDF</button>
                <button onClick={sendEmail} className="btn-main" style={{flex: 1, background: 'white', color: '#1e293b', border: '2px solid #f1f5f9'}}>Email</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
