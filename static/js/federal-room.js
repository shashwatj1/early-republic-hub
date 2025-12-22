// ========================================
// FEDERAL POWER ROOM - JAVASCRIPT
// ========================================

function showInterpretation(type) {
    const resultDiv = document.getElementById('interpretationResult');
    
    if (type === 'strict') {
        resultDiv.innerHTML = `
            <div class="alert alert-danger">
                <h5>🔴 You chose: Strict Interpretation (Democratic-Republican view)</h5>
                <p><strong>Jefferson's Argument:</strong></p>
                <ul>
                    <li>"Necessary" means <em>absolutely essential</em>, not just convenient</li>
                    <li>Congress can only do what's explicitly listed in the Constitution</li>
                    <li>If we let Congress decide what's "necessary," they'll claim unlimited power!</li>
                    <li>States should handle most government functions</li>
                </ul>
                <p class="mb-0"><strong>Problem:</strong> This strict view made it hard to do things like buy Louisiana or create a national bank - both of which helped the nation!</p>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div class="alert alert-primary">
                <h5>🔵 You chose: Loose Interpretation (Federalist view)</h5>
                <p><strong>Hamilton's Argument:</strong></p>
                <ul>
                    <li>"Necessary" means <em>useful</em> or <em>convenient</em> for executing powers</li>
                    <li>Congress needs flexibility to do its job effectively</li>
                    <li>Government must adapt to changing circumstances</li>
                    <li>If a law helps Congress execute its listed powers, it's constitutional</li>
                </ul>
                <p class="mb-0"><strong>Problem:</strong> This loose view could let federal government grow too powerful and crush states' rights!</p>
            </div>
        `;
    }
    
    resultDiv.style.display = 'block';
}

function showBankDebate() {
    const debateDiv = document.getElementById('bankDebate');
    
    debateDiv.innerHTML = `
        <div class="debate-container">
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="alert alert-primary">
                        <h6>🔵 Hamilton (Federalist):</h6>
                        <p class="small">"A bank is <strong>necessary and proper</strong> because:</p>
                        <ul class="small">
                            <li>Helps government collect taxes</li>
                            <li>Provides stable currency</li>
                            <li>Enables government to borrow money</li>
                        </ul>
                        <p class="small mb-0">All of these help Congress execute its listed powers!"</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="alert alert-danger">
                        <h6>🔴 Jefferson (D-R):</h6>
                        <p class="small">"A bank is NOT constitutional because:</p>
                        <ul class="small">
                            <li>Constitution doesn't say 'create banks'</li>
                            <li>If we allow this, what's next?</li>
                            <li>This violates states' rights</li>
                        </ul>
                        <p class="small mb-0">We must stick to what's written!"</p>
                    </div>
                </div>
            </div>
            <div class="alert alert-success mt-3">
                <strong>Who Won?</strong> Hamilton! Washington signed the bank into law. But this debate never ended - it continues today!
            </div>
        </div>
    `;
    
    debateDiv.style.display = 'block';
}

function makeChoice(choice) {
    const resultDiv = document.getElementById('choiceResult');
    
    if (choice === 'buy') {
        resultDiv.innerHTML = `
            <div class="alert alert-success">
                <h5>✅ You chose: Buy It Anyway</h5>
                <p><strong>This is what Jefferson actually did!</strong></p>
                <p>Jefferson wrote: "The less we say about constitutional difficulties, the better."</p>
                <p><strong>His justification:</strong></p>
                <ul>
                    <li>Treaty-making power (Constitution allows President to make treaties)</li>
                    <li>This was technically a treaty with France</li>
                    <li>Deal too good to pass up - doubled nation's size!</li>
                </ul>
                <div class="mt-3 p-3 bg-warning rounded">
                    <strong>🤔 The Hypocrisy:</strong> Jefferson spent years arguing for strict interpretation, then used a <em>loose</em> interpretation when it suited him! Federalists called him out on this, but most Americans were thrilled with the purchase.
                </div>
                <p class="mt-3 mb-0"><strong>Result:</strong> Jefferson was able to purchase Louisina as well the rest of France's terriroy in North America for only 15 Milllion dollars at the time, this was a very imnportant for the devoloping and territory country hungry country. </p>
            </div>
        `;
    } else if (choice === 'refuse') {
        resultDiv.innerHTML = `
            <div class="alert alert-danger">
                <h5>❌ You chose: Refuse the Deal</h5>
                <p><strong>This is NOT what Jefferson did!</strong></p>
                <p>If Jefferson had done this:</p>
                <ul>
                    <li>France keeps Louisiana (or sells to Britain!)</li>
                    <li>America stays small and weak</li>
                    <li>No westward expansion for decades</li>
                    <li>European powers control North America</li>
                </ul>
                <p class="mb-0"><strong>Lesson:</strong> Sometimes being too rigid about principles means missing opportunities that help the nation!</p>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div class="alert alert-warning">
                <h5>⏰ You chose: Seek Constitutional Amendment</h5>
                <p><strong>This is what Jefferson originally wanted to do!</strong></p>
                <p>The problem:</p>
                <ul>
                    <li>Amendments take MONTHS or YEARS</li>
                    <li>Napoleon might change his mind</li>
                    <li>Britain might buy it instead</li>
                    <li>Deal could fall through</li>
                </ul>
                <p><strong>What actually happened:</strong> Jefferson started drafting an amendment, but his advisors convinced him the opportunity was too urgent. He bought Louisiana without the amendment.</p>
                <p class="mb-0"><strong>Lesson:</strong> This proved that the elastic clause was neccesary and that Jefferson did not alwasy follow his morals.  </p>
            </div>
        `;
    }
    
    resultDiv.style.display = 'block';
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}