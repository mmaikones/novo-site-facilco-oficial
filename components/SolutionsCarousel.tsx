import React from 'react';
import Safety from './Safety';
import Weighbridge from './Weighbridge';
import IndustrialProjects from './IndustrialProjects';
import MachineGuarding from './MachineGuarding';
import DockSolutions from './DockSolutions';

const SolutionsCarousel: React.FC = () => {
    // Standard vertical layout logic (No Cascade/Sticky)
    // Using alternating backgrounds for section separation

    return (
        <div className="relative bg-white w-full">
            {/* Section 1: Safety (Linha de Vida) */}
            <section className="py-24 bg-white w-full border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-8">
                    <Safety />
                </div>
            </section>

            {/* Section 2: Weighbridge (Balança) */}
            <section className="py-24 bg-gray-50 w-full border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-8">
                    <Weighbridge />
                </div>
            </section>

            {/* Section 3: Machine Guarding (NR-12) */}
            <section className="py-24 bg-white w-full border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-8">
                    <MachineGuarding />
                </div>
            </section>

            {/* Section 4: Dock Solutions */}
            <section className="py-24 bg-gray-50 w-full border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-8">
                    <DockSolutions />
                </div>
            </section>

            {/* Section 5: Industrial Projects */}
            <section className="py-24 bg-white w-full">
                <div className="container mx-auto px-4 md:px-8">
                    <IndustrialProjects />
                </div>
            </section>
        </div>
    );
};

export default SolutionsCarousel;
