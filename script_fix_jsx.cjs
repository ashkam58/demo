const fs = require('fs');
let content = fs.readFileSync('src/world_of_coding.tsx', 'utf8');

const errorRegion = \                {/* Floor Shadow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/10 rounded-[100%] blur-sm"></div>
              </div>
            </div>
            
            {/* Speech bubble */}\;

const fixedRegion = \                {/* Floor Shadow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/10 rounded-[100%] blur-sm"></div>
              </div>
            
            {/* Speech bubble */}\;

content = content.replace(errorRegion, fixedRegion);
fs.writeFileSync('src/world_of_coding.tsx', content);
