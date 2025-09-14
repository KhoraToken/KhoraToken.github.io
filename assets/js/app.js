
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if(id && id.length>1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Presale rounds (20 rounds)
const rounds = Array.from({length:20}, (_,i)=>{
  const price = 0.00010 + (i*0.00001);
  const tokens = 1_000_000_000;
  const raise = price * tokens;
  return {round:i+1, tokens, price:price, raise};
});
function fmt(n){ return n.toLocaleString(undefined, {maximumFractionDigits: 8}); }
function fmtUSD(n){ return '$' + n.toLocaleString(undefined, {maximumFractionDigits: 0}); }
const tbody = document.querySelector('#presale-body');
if(tbody){
  rounds.forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>Round ${r.round}</td>
                    <td>${fmt(r.tokens)}</td>
                    <td>$${r.price.toFixed(5)}</td>
                    <td>${fmtUSD(r.raise)}</td>`;
    tbody.appendChild(tr);
  });
}

// Tokenomics pie with Chart.js if available
if (window.Chart){
  const ctx = document.getElementById('tokenChart');
  if(ctx){
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Liquidity 50B', 'Presale 20B', 'Community 10B', 'Team 10B', 'Reserves 5B', 'Marketing 5B'],
        datasets: [{ data: [50,20,10,10,5,5] }]
      },
      options: { plugins: { legend: { position: 'bottom', labels: { color: '#eae6f5' } } } }
    });
  }
}
const yearEl = document.getElementById('year');
if(yearEl){ yearEl.textContent = new Date().getFullYear(); }
