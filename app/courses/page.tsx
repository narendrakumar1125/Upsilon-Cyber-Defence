'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';
import { Lock, Server, Database, Code, LineChart, Globe, Shield, Search, Filter, X, ChevronDown, BookOpen } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// Course type definition
type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  price: string;
  icon?: React.ReactNode;
  popular?: boolean;
  featured?: boolean;
  syllabusLink?: string;
  tags: string[];
};

// Empty array - all courses will come from Firestore
const fallbackCoursesData: Course[] = [];

// Search component wrapper with Suspense
const CourseSearchWrapper = ({ onSearch }: { onSearch: (query: string) => void }) => {
  return (
    <Suspense fallback={
      <div className="w-full lg:max-w-md relative bg-dark-200 border border-dark-300 text-light rounded-md block h-12 animate-pulse"></div>
    }>
      <CourseSearch onSearch={onSearch} />
    </Suspense>
  );
};

// Search component that uses useSearchParams
function CourseSearch({ onSearch }: { onSearch: (query: string) => void }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  
  useEffect(() => {
    onSearch(initialQuery);
  }, [initialQuery, onSearch]);

  return (
    <div className="w-full lg:max-w-md relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={20} className="text-gray-400" />
      </div>
      <input
        type="text"
        className="bg-dark-200 border border-dark-300 text-light rounded-md block w-full pl-10 pr-4 py-3 focus:outline-none focus:border-primary"
        placeholder="Search courses..."
        defaultValue={initialQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

// Main content component
function CoursesContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesQuery = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(coursesQuery);
        const firestoreCourses = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          icon: <BookOpen className="h-8 w-8 text-primary" /> // Default icon
        })) as Course[];
        
        // Combine Firestore courses with fallback courses
        const combinedCourses = [...firestoreCourses, ...fallbackCoursesData];
        
        // Remove duplicates based on id
        const uniqueCourses = Array.from(
          new Map(combinedCourses.map(course => [course.id, course])).values()
        );
        
        setCourses(uniqueCourses);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Use fallback data if Firestore fails
        setCourses(fallbackCoursesData);
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on selected category, search query, and levels
  useEffect(() => {
    let results = courses;
    
    // Filter by category
    if (activeCategory !== 'all') {
      results = results.filter(course => course.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        course => 
          course.title.toLowerCase().includes(query) || 
          course.description.toLowerCase().includes(query) ||
          course.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by level
    if (selectedLevels.length > 0) {
      results = results.filter(course => 
        selectedLevels.some(level => course.level.includes(level))
      );
    }
    
    setFilteredCourses(results);
  }, [activeCategory, searchQuery, selectedLevels, courses]);

  // Get unique levels from courses
  const levels = Array.from(new Set(courses.map(course => course.level)));

  // Toggle level selection
  const toggleLevel = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  // Categories
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'cybersecurity', name: 'Cybersecurity' },
    { id: 'devops', name: 'DevOps' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'development', name: 'Software Development' },
  ];

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-dark to-dark-100 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cyber-grid opacity-10" style={{
            transform: 'perspective(1000px) rotateX(60deg)',
            transformOrigin: 'top',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Explore Our <span className="gradient-text">Courses</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your career with our industry-leading training programs designed by experts
            </p>
          </div>
        </div>
      </section>
      
      {/* Courses Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-10">
            <CourseSearchWrapper onSearch={setSearchQuery} />
            
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-dark'
                      : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-dark-200 rounded-full text-gray-300 hover:bg-dark-300 transition-all lg:ml-4"
            >
              <Filter size={18} />
              <span>Filters</span>
              {selectedLevels.length > 0 && (
                <span className="bg-primary/20 text-primary text-xs rounded-full px-2 py-1">
                  {selectedLevels.length}
                </span>
              )}
            </button>
          </div>
          
          {/* Filters Dropdown */}
          {isFilterOpen && (
            <div className="glass-card p-6 mb-8 relative">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-light"
              >
                <X size={20} />
              </button>
              
              <div>
                <h3 className="text-lg font-bold mb-4">Filter by Level</h3>
                <div className="flex flex-wrap gap-3">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => toggleLevel(level)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        selectedLevels.includes(level)
                          ? 'bg-primary text-dark'
                          : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedLevels.length > 0 && (
                <button
                  onClick={() => setSelectedLevels([])}
                  className="text-sm text-gray-400 hover:text-primary mt-4 flex items-center gap-1"
                >
                  <X size={14} />
                  Clear filters
                </button>
              )}
            </div>
          )}
          
          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300">Loading courses...</p>
            </div>
          ) : (
            <>
          {/* Featured Courses */}
          {!searchQuery && activeCategory === 'all' && selectedLevels.length === 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses
                  .filter(course => course.featured)
                  .map((course) => (
                    <Suspense key={course.id} fallback={
                      <div className="glass-card overflow-hidden h-full flex flex-col animate-pulse">
                        <div className="p-6 pb-4 border-b border-dark-300">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-dark-200"></div>
                            <div className="h-6 bg-dark-200 rounded w-3/4"></div>
                          </div>
                          <div className="h-12 bg-dark-200 rounded w-full mb-4"></div>
                        </div>
                        <div className="bg-dark-200/50 p-4 mt-auto">
                          <div className="flex flex-wrap justify-between">
                            <div className="h-4 bg-dark-200 rounded w-1/4 mb-2"></div>
                            <div className="h-4 bg-dark-200 rounded w-1/4 mb-2"></div>
                            <div className="h-4 bg-dark-200 rounded w-1/4"></div>
                          </div>
                        </div>
                      </div>
                    }>
                      <Link href={`/courses/${course.id}`}>
                        <div className="glass-card overflow-hidden group cursor-pointer h-full flex flex-col hover:border-primary/30 transition-all duration-300">
                          <div className="p-6 pb-4 border-b border-dark-300">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                                  {course.icon}
                                </div>
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                  {course.title}
                                </h3>
                              </div>
                              {course.popular && (
                                <div className="bg-primary/20 text-primary text-xs font-bold py-1 px-2 rounded">
                                  Popular
                                </div>
                              )}
                            </div>
                            <p className="text-gray-300 text-sm mb-4">{course.description}</p>
                          </div>
                          <div className="bg-dark-200/50 p-4 mt-auto">
                            <div className="flex flex-wrap justify-between text-sm">
                              <div className="text-gray-400 mb-2 mr-4">
                                <span className="font-bold text-gray-300">{course.duration}</span>
                              </div>
                              <div className="text-gray-400 mb-2 mr-4">
                                <span className="font-bold text-gray-300">{course.level}</span>
                              </div>
                              <div className="text-primary font-bold">{course.price}</div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Suspense>
                  ))}
              </div>
            </div>
          )}
          
          {/* All Courses / Filtered Results */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {searchQuery || selectedLevels.length > 0 ? 'Search Results' : 
                activeCategory === 'all' ? 'All Courses' : `${categories.find(c => c.id === activeCategory)?.name}`}
              </h2>
              <div className="text-gray-400 text-sm">
                Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
              </div>
            </div>
            
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <Suspense key={course.id} fallback={
                    <div className="glass-card overflow-hidden h-full flex flex-col animate-pulse">
                      <div className="p-6 pb-4 border-b border-dark-300">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-dark-200"></div>
                          <div className="h-6 bg-dark-200 rounded w-3/4"></div>
                        </div>
                        <div className="h-12 bg-dark-200 rounded w-full mb-4"></div>
                      </div>
                      <div className="bg-dark-200/50 p-4 mt-auto">
                        <div className="flex flex-wrap justify-between">
                          <div className="h-4 bg-dark-200 rounded w-1/4 mb-2"></div>
                          <div className="h-4 bg-dark-200 rounded w-1/4 mb-2"></div>
                          <div className="h-4 bg-dark-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  }>
                    <Link href={`/courses/${course.id}`}>
                      <div className="glass-card overflow-hidden group cursor-pointer h-full flex flex-col hover:border-primary/30 transition-all duration-300">
                        <div className="p-6 pb-4 border-b border-dark-300">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                                {course.icon}
                              </div>
                              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                {course.title}
                              </h3>
                            </div>
                            {course.popular && (
                              <div className="bg-primary/20 text-primary text-xs font-bold py-1 px-2 rounded">
                                Popular
                              </div>
                            )}
                          </div>
                          <p className="text-gray-300 text-sm mb-4">{course.description}</p>
                        </div>
                        <div className="bg-dark-200/50 p-4 mt-auto">
                          <div className="flex flex-wrap justify-between text-sm">
                            <div className="text-gray-400 mb-2 mr-4">
                              <span className="font-bold text-gray-300">{course.duration}</span>
                            </div>
                            <div className="text-gray-400 mb-2 mr-4">
                              <span className="font-bold text-gray-300">{course.level}</span>
                            </div>
                            <div className="text-primary font-bold">{course.price}</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Suspense>
                ))}
              </div>
            ) : (
              <div className="glass-card p-8 text-center">
                <div className="text-gray-300 mb-4">No courses found matching your criteria</div>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                    setSelectedLevels([]);
                  }}
                  className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 mx-auto"
                >
                  <ChevronDown className="transform rotate-180" size={16} />
                  View all courses
                </button>
              </div>
            )}
          </div>
            </>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Not sure which course is right for you? Get a free consultation with our career advisors.
          </p>
          <Suspense fallback={
            <div className="bg-gradient-to-r from-primary to-secondary text-dark font-bold py-3 px-8 rounded-md inline-block opacity-70">
              Loading...
            </div>
          }>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-8 rounded-md transition-all transform hover:scale-105 inline-block"
            >
              Get Free Demo
            </Link>
          </Suspense>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

// Main Page Component with Suspense Boundary
export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading courses...</p></div>}>
        <CoursesContent />
      </Suspense>
    </div>
  );
}
