// ========================================
// EUROPEAN RELATIONS ROOM - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize embargo slider
    const embargoSlider = document.getElementById('embargoMonths');
    if (embargoSlider) {
        embargoSlider.addEventListener('input', updateEmbargoImpact);
        updateEmbargoImpact(); // Initial state
    }
});

// Impressment Simulation
function runImpressment() {
    const stepsDiv = document.getElementById('impressmentSteps');
    
    const steps = [
        { time: 0, text: "⚓ British warship approaches...", class: "alert-warning" },
        { time: 1000, text: "🛑 Warning shot fired across your bow", class: "alert-warning" },
        { time: 2000, text: "⚔️ Armed British sailors board your ship", class: "alert-danger" },
        { time: 3000, text: '👥 They line up your crew: "Any British subjects here?"', class: "alert-danger" },
        { time: 4500, text: "📄 Your sailors show American citizenship papers", class: "alert-info" },
        { time: 5500, text: '🚫 British officer: "These papers are worthless! These men are British!"', class: "alert-danger" },
        { time: 7000, text: "😱 They take 6 of your crew members by force", class: "alert-danger" },
        { time: 8500, text: "⛓️ Your sailors are now forced to serve on British warships", class: "alert-danger" },
        { time: 10000, text: "😡 You return to port - furious and short-handed", class: "alert-dark" }
    ];
    
    stepsDiv.innerHTML = '<div class="alert alert-info"><strong>Simulation starting...</strong></div>';
    stepsDiv.style.display = 'block';
    
    steps.forEach(step => {
        setTimeout(() => {
            const stepDiv = document.createElement('div');
            stepDiv.className = `alert ${step.class} mb-2`;
            stepDiv.innerHTML = `<strong>${step.text}</strong>`;
            stepsDiv.appendChild(stepDiv);
            stepDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, step.time);
    });
    
    setTimeout(() => {
        const finalDiv = document.createElement('div');
        finalDiv.className = 'alert alert-danger mt-3';
        finalDiv.innerHTML = `
            <h5>This happened to over 10,000 Americans!</h5>
            <p>Now you understand why Americans were so angry. Britain treated the U.S. like a colony, not an independent nation.</p>
            <p class="mb-0"><strong>This is why War of 1812 was called "Second War of Independence"!</strong></p>
        `;
        stepsDiv.appendChild(finalDiv);
        
        // Add "End of simulation" message
        setTimeout(() => {
            const endDiv = document.createElement('div');
            endDiv.className = 'alert alert-dark mt-2 text-center';
            endDiv.innerHTML = `<strong>━━━ End of simulation ━━━</strong>`;
            stepsDiv.appendChild(endDiv);
        }, 2000);
    }, 11000);
}

// Embargo Act Impact Calculator
function updateEmbargoImpact() {
    const months = parseInt(document.getElementById('embargoMonths').value);
    document.getElementById('monthsDisplay').textContent = months;
    
    const impactDiv = document.getElementById('embargoImpact');
    
    if (months === 0) {
        impactDiv.innerHTML = `
            <div class="alert alert-secondary">
                <strong>Month 0:</strong> Embargo just announced. Americans optimistic this will force Britain to negotiate!
            </div>
        `;
    } else if (months <= 3) {
        impactDiv.innerHTML = `
            <div class="alert alert-warning">
                <strong>Months 1-3:</strong>
                <ul class="mb-0">
                    <li>American exports: 📉 Down 75%</li>
                    <li>Port cities: 😟 Ships idle in harbors</li>
                    <li>Britain: 😐 Slightly annoyed, finding other suppliers</li>
                    <li>American opinion: 🤔 Starting to doubt this plan...</li>
                </ul>
            </div>
        `;
    } else if (months <= 8) {
        impactDiv.innerHTML = `
            <div class="alert alert-danger">
                <strong>Months 4-8:</strong>
                <ul class="mb-0">
                    <li>American economy: 💥 COLLAPSING</li>
                    <li>Unemployment: 📈 Skyrocketing in coastal cities</li>
                    <li>Smuggling: 🚢 Widespread (Jefferson can't stop it)</li>
                    <li>Britain: 🙂 Doing fine, trading with South America</li>
                    <li>New England: 😡 FURIOUS at Jefferson</li>
                </ul>
            </div>
        `;
    } else {
        impactDiv.innerHTML = `
            <div class="alert alert-dark">
                <strong>Months 9-15:</strong>
                <ul class="mb-0">
                    <li>American economy: ☠️ Depression</li>
                    <li>Jefferson's approval: 📉 Tanking</li>
                    <li>Enforcement: ⚔️ Jefferson using military to stop smugglers</li>
                    <li>Critics: "Jefferson is a TYRANT!"</li>
                    <li>Britain: 😎 Completely unbothered</li>
                    <li><strong>March 1809: Embargo REPEALED (failed)</strong></li>
                </ul>
            </div>
        `;
    }
}

function revealEmbargoResult() {
    const resultDiv = document.getElementById('embargoResult');
    resultDiv.innerHTML = `
        <div class="alert alert-danger">
            <h5>💥 TOTAL FAILURE!</h5>
            <p><strong>What Jefferson Expected:</strong> Britain would negotiate to get American trade back</p>
            <p><strong>What Actually Happened:</strong></p>
            <ul>
                <li>American economy collapsed instead of British</li>
                <li>Britain found alternative markets (South America)</li>
                <li>Smuggling became rampant (couldn't be stopped)</li>
                <li>New England threatened to secede from the Union!</li>
                <li>Jefferson had to repeal it after 15 months</li>
            </ul>
            <p class="mb-0"><strong>Lesson:</strong> "Peaceable coercion" sounded good in theory but was a disaster in practice. Helped lead to War of 1812 instead of preventing it!</p>
        </div>
    `;
    resultDiv.style.display = 'block';
}

// War of 1812 Events
function showWarEvent(event) {
    const detailDiv = document.getElementById('warEventDetail');
    
    const events = {
        causes: {
            title: "Why America Declared War (June 1812)",
            content: `
                <h5>Main Causes:</h5>
                <ol>
                    <li><strong>Impressment:</strong> 10,000+ Americans forced into British Navy</li>
                    <li><strong>Trade Restrictions:</strong> Britain interfering with American commerce</li>
                    <li><strong>Indian Support:</strong> Britain arming Native Americans in Northwest</li>
                    <li><strong>National Honor:</strong> Britain still treating U.S. like a colony</li>
                </ol>
                <p><strong>Vote:</strong> 79-49 in House, 19-13 in Senate (very divided!)</p>
                <p><strong>Federalists:</strong> Strongly opposed (especially New England)</p>
                <p><strong>War Hawks:</strong> Young D-Rs like Henry Clay pushed for war</p>
            `
        },
        early: {
            title: "1812-1813: Early American Disasters",
            content: `
                <h5>Things went BADLY for America:</h5>
                <ul>
                    <li><strong>Detroit:</strong> Surrendered without a fight (humiliating!)</li>
                    <li><strong>Invasions of Canada:</strong> All failed miserably</li>
                    <li><strong>Navy:</strong> A few victories, but vastly outnumbered</li>
                    <li><strong>Morale:</strong> Americans wondering if this war was a mistake</li>
                </ul>
                <p class="mb-0"><strong>Problem:</strong> America was unprepared - small army, no national bank to finance war, divided public opinion</p>
            `
        },
        burning: {
            title: "August 1814: British Burn Washington D.C.",
            content: `
                <h5>The Low Point of the War:</h5>
                <ul>
                    <li><strong>British troops march into Washington</strong></li>
                    <li><strong>White House:</strong> Burned (Dolley Madison saved Washington's portrait!)</li>
                    <li><strong>Capitol Building:</strong> Destroyed</li>
                    <li><strong>Treasury, War Dept:</strong> Burned</li>
                </ul>
                <p><strong>Why?</strong> Retaliation for Americans burning York (Toronto)</p>
                <p><strong>Impact:</strong> National humiliation - capital of the U.S. occupied and burned!</p>
                <p class="mb-0"><strong>Madison's government:</strong> Fled to Virginia. Many thought the war was lost.</p>
            `
        },
        baltimore: {
            title: "September 1814: Fort McHenry Holds!",
            content: `
                <h5>Baltimore Refuses to Fall:</h5>
                <p>After burning Washington, British attacked Baltimore next...</p>
                <ul>
                    <li><strong>Fort McHenry:</strong> Defended Baltimore's harbor</li>
                    <li><strong>25-hour bombardment:</strong> British ships firing rockets all night</li>
                    <li><strong>Francis Scott Key:</strong> Watched from British ship, anxious to see if flag still flew</li>
                    <li><strong>Dawn:</strong> American flag STILL THERE! Fort held!</li>
                </ul>
                <div class="alert alert-success mt-2">
                    <strong>"Star-Spangled Banner"</strong> written by Key that morning - became national anthem!
                </div>
                <p class="mb-0"><strong>Impact:</strong> Lifted American spirits. Baltimore's defense was a turning point!</p>
            `
        },
        ghent: {
            title: "December 24, 1814: Treaty of Ghent",
            content: `
                <h5>Peace Treaty Signed (Before News could travel!)</h5>
                <p><strong>Terms:</strong> "Status quo ante bellum" - everything returns to how it was before war</p>
                <ul>
                    <li>❌ No mention of impressment</li>
                    <li>❌ No territory changes</li>
                    <li>❌ No reparations</li>
                    <li>✅ War ends, prisoners exchanged</li>
                </ul>
                <div class="alert alert-info mt-2">
                    <strong>The Communication Problem:</strong> News took 6-8 weeks to cross Atlantic. This meant...
                </div>
                <p class="mb-0"><strong>Battle of New Orleans would be fought AFTER peace was signed!</strong></p>
            `
        },
        neworleans: {
            title: "January 8, 1815: Battle of New Orleans",
            content: `
                <h5>Andrew Jackson's Stunning Victory</h5>
                <p><strong>The Irony:</strong> Peace treaty already signed (but no one knew yet!)</p>
                <h6>The Battle:</h6>
                <ul>
                    <li><strong>British:</strong> 8,000 professional soldiers</li>
                    <li><strong>Americans:</strong> 4,700 militia, pirates, free Blacks behind cotton bales</li>
                    <li><strong>Result:</strong> British: 2,000+ casualties | Americans: 13 killed, 58 wounded</li>
                </ul>
                <div class="alert alert-success mt-2">
                    <strong>DECISIVE AMERICAN VICTORY!</strong>
                </div>
                <h6 class="mt-3">Why This Mattered:</h6>
                <ul class="mb-0">
                    <li>Americans didn't know war was over - thought they WON the war!</li>
                    <li>Made Andrew Jackson a national hero (future president)</li>
                    <li>Gave America confidence - we beat Britain AGAIN!</li>
                    <li>Created "Era of Good Feelings" - national pride surged</li>
                </ul>
            `
        }
    };
    
    const eventData = events[event];
    detailDiv.innerHTML = `
        <h4>${eventData.title}</h4>
        ${eventData.content}
    `;
    detailDiv.style.display = 'block';
    detailDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}